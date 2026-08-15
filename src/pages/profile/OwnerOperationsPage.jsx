import { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import BottomNav from '../../components/common/BottomNav';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Container from '../../components/common/Container';
import Header from '../../components/common/Header';
import { SkeletonBlock } from '../../components/common/Skeleton';
import { useToast } from '../../components/common/ToastProvider';
import { useAuth } from '../../context/AuthContext';
import { useShopLink } from '../../query/linkQueries';
import {
  useCreateHoliday,
  useDeleteHoliday,
  useHolidays,
  useOperatingTimes,
  useScheduleSettings,
  useStaffOperatingTimes,
  useUpdateOperatingTimes,
  useUpdateSlotInterval,
  useUpdateStaffOperatingTimes,
} from '../../query/scheduleQueries';
import { useShopInfoById } from '../../query/shopQueries';
import * as S from './OwnerOperationsPage.styles';

const DAYS = [
  ['MONDAY', '월'],
  ['TUESDAY', '화'],
  ['WEDNESDAY', '수'],
  ['THURSDAY', '목'],
  ['FRIDAY', '금'],
  ['SATURDAY', '토'],
  ['SUNDAY', '일'],
];
const DAY_LABELS = Object.fromEntries(DAYS);
const DEFAULT_RANGE = { start: '09:00', end: '18:00' };
const DEFAULT_HOLIDAY = {
  holidayType: 'WEEKLY',
  dayOfWeek: 'SUNDAY',
  weekOfMonth: 1,
  referenceDate: '',
  specificDate: '',
};

const normalizeTime = (value, fallback) => String(value || fallback).slice(0, 5);

const formatLeadTime = (minutes) => {
  if (!Number.isFinite(Number(minutes))) return '확인할 수 없음';
  if (Number(minutes) < 60) return `${minutes}분 전까지`;
  const hours = Math.floor(Number(minutes) / 60);
  const remainder = Number(minutes) % 60;
  return remainder ? `${hours}시간 ${remainder}분 전까지` : `${hours}시간 전까지`;
};

const holidayLabel = (holiday) => {
  if (holiday.holidayType === 'WEEKLY') {
    return `매주 ${DAY_LABELS[holiday.dayOfWeek]}요일`;
  }
  if (holiday.holidayType === 'BIWEEKLY') {
    return `격주 ${DAY_LABELS[holiday.dayOfWeek]}요일 · ${holiday.referenceDate} 기준`;
  }
  if (holiday.holidayType === 'MONTHLY') {
    return `매달 ${holiday.weekOfMonth}째 주 ${DAY_LABELS[holiday.dayOfWeek]}요일`;
  }
  return `${holiday.specificDate} 휴무`;
};

function StaffHoursEditor({ shopId, staff }) {
  const { showToast } = useToast();
  const { data, isLoading, isError, refetch } = useStaffOperatingTimes(shopId, staff.staffId);
  const updateStaffHours = useUpdateStaffOperatingTimes();
  const [overrides, setOverrides] = useState({});

  useEffect(() => {
    if (!data) return;
    setOverrides(
      Object.fromEntries(
        (data.overrides || []).map((item) => [
          item.dayOfWeek,
          {
            isOff: item.isOff,
            start: normalizeTime(item.start, '09:00'),
            end: normalizeTime(item.end, '18:00'),
          },
        ])
      )
    );
  }, [data]);

  const toggleDay = (day) => {
    setOverrides((current) => {
      if (current[day]) {
        const next = { ...current };
        delete next[day];
        return next;
      }
      return { ...current, [day]: { isOff: true, start: '09:00', end: '18:00' } };
    });
  };

  const updateDay = (day, patch) => {
    setOverrides((current) => ({ ...current, [day]: { ...current[day], ...patch } }));
  };

  const save = async () => {
    const payload = DAYS.filter(([day]) => overrides[day]).map(([day]) => {
      const value = overrides[day];
      return value.isOff
        ? { dayOfWeek: day, isOff: true }
        : { dayOfWeek: day, isOff: false, start: value.start, end: value.end };
    });

    try {
      await updateStaffHours.mutateAsync({ shopId, staffId: staff.staffId, overrides: payload });
      showToast(`${staff.staffName} 담당자 운영시간을 저장했습니다.`, { tone: 'success' });
    } catch {
      showToast('담당자 운영시간은 매장 운영시간 안에서 설정해주세요.', { tone: 'error' });
    }
  };

  if (isLoading) return <SkeletonBlock $width="100%" $height="92px" $radius="14px" />;
  if (isError) {
    return (
      <S.InlineError role="alert">
        담당자 운영시간을 불러오지 못했습니다.
        <button type="button" onClick={() => refetch()}>
          다시 시도
        </button>
      </S.InlineError>
    );
  }

  return (
    <S.StaffEditor>
      <S.StaffHeading>
        <strong>{staff.staffName}</strong>
        <span>매장 시간과 다른 요일만 추가하세요.</span>
      </S.StaffHeading>
      <S.OverrideList>
        {DAYS.map(([day, label]) => {
          const value = overrides[day];
          return (
            <S.OverrideRow key={day}>
              <S.OverrideToggle
                type="button"
                $active={Boolean(value)}
                onClick={() => toggleDay(day)}
              >
                {label}
              </S.OverrideToggle>
              {value ? (
                <S.OverrideFields>
                  <S.SmallSelect
                    aria-label={`${label}요일 담당자 근무 유형`}
                    value={value.isOff ? 'OFF' : 'CUSTOM'}
                    onChange={(event) => updateDay(day, { isOff: event.target.value === 'OFF' })}
                  >
                    <option value="OFF">휴무</option>
                    <option value="CUSTOM">시간 지정</option>
                  </S.SmallSelect>
                  {!value.isOff ? (
                    <S.TimePair>
                      <input
                        type="time"
                        aria-label={`${label}요일 담당자 시작 시간`}
                        value={value.start}
                        onChange={(event) => updateDay(day, { start: event.target.value })}
                      />
                      <span>–</span>
                      <input
                        type="time"
                        aria-label={`${label}요일 담당자 종료 시간`}
                        value={value.end}
                        onChange={(event) => updateDay(day, { end: event.target.value })}
                      />
                    </S.TimePair>
                  ) : null}
                </S.OverrideFields>
              ) : (
                <S.InheritLabel>매장 시간 적용</S.InheritLabel>
              )}
            </S.OverrideRow>
          );
        })}
      </S.OverrideList>
      <S.SecondarySaveButton type="button" onClick={save} disabled={updateStaffHours.isPending}>
        {updateStaffHours.isPending ? '저장 중...' : '담당자 시간 저장'}
      </S.SecondarySaveButton>
    </S.StaffEditor>
  );
}

export default function OwnerOperationsPage() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { showToast } = useToast();
  const { data: shopLink, isLoading: isShopLinkLoading } = useShopLink({
    enabled: auth?.userType === 'OWNER',
  });
  const shopId = shopLink?.shopId;
  const { data: shopInfo } = useShopInfoById(shopId);
  const settingsQuery = useScheduleSettings(shopId);
  const operatingQuery = useOperatingTimes(shopId);
  const holidaysQuery = useHolidays(shopId);
  const updateInterval = useUpdateSlotInterval();
  const updateOperatingTimes = useUpdateOperatingTimes();
  const createHoliday = useCreateHoliday();
  const deleteHoliday = useDeleteHoliday();
  const [interval, setInterval] = useState('30');
  const [dayTimes, setDayTimes] = useState({});
  const [holidayForm, setHolidayForm] = useState(DEFAULT_HOLIDAY);
  const [holidayToDelete, setHolidayToDelete] = useState(null);

  useEffect(() => {
    if (settingsQuery.data?.intervalMinutes) {
      setInterval(String(settingsQuery.data.intervalMinutes));
    }
  }, [settingsQuery.data]);

  useEffect(() => {
    if (!operatingQuery.data) return;
    setDayTimes(
      Object.fromEntries(
        Object.entries(operatingQuery.data.dayTimes || {}).map(([day, ranges]) => [
          day,
          ranges.map((range) => ({
            start: normalizeTime(range.start, '09:00'),
            end: normalizeTime(range.end, '18:00'),
          })),
        ])
      )
    );
  }, [operatingQuery.data]);

  const holidays = holidaysQuery.data?.holidays || [];
  const staffs = useMemo(() => shopInfo?.staffs || [], [shopInfo]);
  const isInitialLoading =
    isShopLinkLoading ||
    settingsQuery.isLoading ||
    operatingQuery.isLoading ||
    holidaysQuery.isLoading;
  const hasLoadError =
    settingsQuery.isError ||
    operatingQuery.isError ||
    holidaysQuery.isError ||
    (!isShopLinkLoading && !shopId);

  if (auth?.userType !== 'OWNER') return <Navigate to="/mypage" replace />;

  const retryAll = () => {
    settingsQuery.refetch();
    operatingQuery.refetch();
    holidaysQuery.refetch();
  };

  const saveInterval = async () => {
    try {
      await updateInterval.mutateAsync({ shopId, intervalMinutes: Number(interval) });
      showToast('예약 간격을 저장했습니다.', { tone: 'success' });
    } catch {
      showToast('예약 간격을 저장하지 못했습니다.', { tone: 'error' });
    }
  };

  const toggleOperatingDay = (day) => {
    setDayTimes((current) => {
      if (current[day]?.length) {
        const next = { ...current };
        delete next[day];
        return next;
      }
      return { ...current, [day]: [{ ...DEFAULT_RANGE }] };
    });
  };

  const updateRange = (day, index, field, value) => {
    setDayTimes((current) => ({
      ...current,
      [day]: current[day].map((range, rangeIndex) =>
        rangeIndex === index ? { ...range, [field]: value } : range
      ),
    }));
  };

  const addRange = (day) => {
    setDayTimes((current) => ({
      ...current,
      [day]: [...(current[day] || []), { ...DEFAULT_RANGE }],
    }));
  };

  const removeRange = (day, index) => {
    setDayTimes((current) => {
      const ranges = current[day].filter((_, rangeIndex) => rangeIndex !== index);
      const next = { ...current };
      if (ranges.length) next[day] = ranges;
      else delete next[day];
      return next;
    });
  };

  const saveOperatingTimes = async () => {
    const invalidRange = Object.values(dayTimes)
      .flat()
      .some(({ start, end }) => !start || !end || start >= end);
    if (invalidRange) {
      showToast('종료 시간은 시작 시간보다 늦게 설정해주세요.', { tone: 'error' });
      return;
    }
    try {
      await updateOperatingTimes.mutateAsync({ shopId, scheduleType: 'BY_DAY', dayTimes });
      showToast('요일별 영업시간을 저장했습니다.', { tone: 'success' });
    } catch {
      showToast('영업시간을 저장하지 못했습니다.', { tone: 'error' });
    }
  };

  const addHoliday = async () => {
    const { holidayType, dayOfWeek, weekOfMonth, referenceDate, specificDate } = holidayForm;
    if (holidayType === 'BIWEEKLY' && !referenceDate) {
      showToast('격주 휴무의 기준 날짜를 선택해주세요.', { tone: 'error' });
      return;
    }
    if (holidayType === 'CUSTOM' && !specificDate) {
      showToast('휴무 날짜를 선택해주세요.', { tone: 'error' });
      return;
    }
    const payload = { shopId, holidayType };
    if (holidayType !== 'CUSTOM') payload.dayOfWeek = dayOfWeek;
    if (holidayType === 'MONTHLY') payload.weekOfMonth = Number(weekOfMonth);
    if (holidayType === 'BIWEEKLY') payload.referenceDate = referenceDate;
    if (holidayType === 'CUSTOM') payload.specificDate = specificDate;

    try {
      await createHoliday.mutateAsync(payload);
      setHolidayForm(DEFAULT_HOLIDAY);
      showToast('휴무일을 추가했습니다.', { tone: 'success' });
    } catch {
      showToast('휴무일을 추가하지 못했습니다.', { tone: 'error' });
    }
  };

  const confirmDeleteHoliday = async () => {
    if (!holidayToDelete) return;
    try {
      await deleteHoliday.mutateAsync({ shopId, holidayId: holidayToDelete.holidayId });
      showToast('휴무일을 삭제했습니다.', { tone: 'success' });
    } catch {
      showToast('휴무일을 삭제하지 못했습니다.', { tone: 'error' });
    } finally {
      setHolidayToDelete(null);
    }
  };

  return (
    <Container $start>
      <S.PageWrapper>
        <S.BackButton
          type="button"
          onClick={() => navigate('/mypage')}
          aria-label="마이페이지로 돌아가기"
        >
          ‹ <span>마이</span>
        </S.BackButton>
        <Header title="매장 운영 설정" description="예약을 받을 시간과 휴무일을 관리해요." />
        <S.Content>
          {isInitialLoading ? (
            <S.LoadingStack role="status" aria-label="매장 운영 설정 불러오는 중">
              <SkeletonBlock $width="100%" $height="128px" $radius="18px" />
              <SkeletonBlock $width="100%" $height="360px" $radius="18px" />
            </S.LoadingStack>
          ) : hasLoadError ? (
            <S.ErrorCard role="alert">
              <strong>운영 설정을 불러오지 못했어요.</strong>
              <span>네트워크 상태를 확인한 뒤 다시 시도해주세요.</span>
              <button type="button" onClick={retryAll}>
                다시 시도
              </button>
            </S.ErrorCard>
          ) : (
            <>
              <S.Section>
                <S.SectionHeading>
                  <h2>예약 간격</h2>
                  <p>예약 시작 시간을 나눌 기본 단위예요.</p>
                </S.SectionHeading>
                <S.Card>
                  <S.OptionGrid>
                    {[10, 15, 20, 30, 60].map((minutes) => (
                      <S.OptionButton
                        key={minutes}
                        type="button"
                        $active={interval === String(minutes)}
                        onClick={() => setInterval(String(minutes))}
                      >
                        {minutes === 60 ? '1시간' : `${minutes}분`}
                      </S.OptionButton>
                    ))}
                  </S.OptionGrid>
                  <S.PrimaryButton
                    type="button"
                    onClick={saveInterval}
                    disabled={updateInterval.isPending}
                  >
                    {updateInterval.isPending ? '저장 중...' : '예약 간격 저장'}
                  </S.PrimaryButton>
                </S.Card>
              </S.Section>

              <S.Section>
                <S.SectionHeading>
                  <h2>영업시간</h2>
                  <p>쉬는 요일은 끄고, 나누어 영업하면 시간대를 추가하세요.</p>
                </S.SectionHeading>
                <S.Card>
                  <S.DayList>
                    {DAYS.map(([day, label]) => {
                      const ranges = dayTimes[day] || [];
                      return (
                        <S.DayRow key={day}>
                          <S.DayTop>
                            <S.DayToggle
                              type="button"
                              $active={ranges.length > 0}
                              onClick={() => toggleOperatingDay(day)}
                            >
                              {label}
                            </S.DayToggle>
                            <span>{ranges.length ? '영업' : '휴무'}</span>
                          </S.DayTop>
                          {ranges.map((range, index) => (
                            <S.RangeRow key={`${day}-${index}`}>
                              <input
                                type="time"
                                aria-label={`${label}요일 ${index + 1}번째 시작 시간`}
                                value={range.start}
                                onChange={(event) =>
                                  updateRange(day, index, 'start', event.target.value)
                                }
                              />
                              <span>–</span>
                              <input
                                type="time"
                                aria-label={`${label}요일 ${index + 1}번째 종료 시간`}
                                value={range.end}
                                onChange={(event) =>
                                  updateRange(day, index, 'end', event.target.value)
                                }
                              />
                              <button
                                type="button"
                                aria-label={`${label}요일 ${index + 1}번째 시간 삭제`}
                                onClick={() => removeRange(day, index)}
                              >
                                ×
                              </button>
                            </S.RangeRow>
                          ))}
                          {ranges.length ? (
                            <S.AddRangeButton type="button" onClick={() => addRange(day)}>
                              + 시간대 추가
                            </S.AddRangeButton>
                          ) : null}
                        </S.DayRow>
                      );
                    })}
                  </S.DayList>
                  <S.PrimaryButton
                    type="button"
                    onClick={saveOperatingTimes}
                    disabled={updateOperatingTimes.isPending}
                  >
                    {updateOperatingTimes.isPending ? '저장 중...' : '영업시간 저장'}
                  </S.PrimaryButton>
                </S.Card>
              </S.Section>

              <S.Section>
                <S.SectionHeading>
                  <h2>예약 접수 정책</h2>
                  <p>고객 예약 가능 시간에 현재 적용되는 기준이에요.</p>
                </S.SectionHeading>
                <S.Card>
                  <S.PolicyList>
                    <S.PolicyRow>
                      <span>예약 가능 기간</span>
                      <strong>오늘부터 {settingsQuery.data?.bookingWindowDays}일 이내</strong>
                    </S.PolicyRow>
                    <S.PolicyRow>
                      <span>최소 예약 준비 시간</span>
                      <strong>{formatLeadTime(settingsQuery.data?.minBookingLeadMinutes)}</strong>
                    </S.PolicyRow>
                    <S.PolicyRow>
                      <span>공휴일 자동 휴무</span>
                      <strong>
                        {settingsQuery.data?.publicHolidayOff ? '적용 중' : '적용 안 함'}
                      </strong>
                    </S.PolicyRow>
                    <S.PolicyRow>
                      <span>예약 확정 방식</span>
                      <strong>사장님 확인 후 확정</strong>
                    </S.PolicyRow>
                  </S.PolicyList>
                  <S.PolicyNote>
                    예약 가능 기간·준비 시간·공휴일 정책의 수정 API는 아직 제공되지 않아 현재
                    적용값만 표시합니다. 예약 취소와 거절은 각 예약 상세에서 사유를 확인한 뒤 처리할
                    수 있습니다.
                  </S.PolicyNote>
                </S.Card>
              </S.Section>

              <S.Section>
                <S.SectionHeading>
                  <h2>휴무일</h2>
                  <p>반복 휴무와 특정 날짜 휴무를 함께 관리해요.</p>
                </S.SectionHeading>
                <S.Card>
                  <S.FormGrid>
                    <label>
                      반복 방식
                      <select
                        value={holidayForm.holidayType}
                        onChange={(event) =>
                          setHolidayForm((current) => ({
                            ...current,
                            holidayType: event.target.value,
                          }))
                        }
                      >
                        <option value="WEEKLY">매주</option>
                        <option value="BIWEEKLY">격주</option>
                        <option value="MONTHLY">매달</option>
                        <option value="CUSTOM">특정 날짜</option>
                      </select>
                    </label>
                    {holidayForm.holidayType !== 'CUSTOM' ? (
                      <label>
                        요일
                        <select
                          value={holidayForm.dayOfWeek}
                          onChange={(event) =>
                            setHolidayForm((current) => ({
                              ...current,
                              dayOfWeek: event.target.value,
                            }))
                          }
                        >
                          {DAYS.map(([day, label]) => (
                            <option key={day} value={day}>
                              {label}요일
                            </option>
                          ))}
                        </select>
                      </label>
                    ) : null}
                    {holidayForm.holidayType === 'MONTHLY' ? (
                      <label>
                        주차
                        <select
                          value={holidayForm.weekOfMonth}
                          onChange={(event) =>
                            setHolidayForm((current) => ({
                              ...current,
                              weekOfMonth: event.target.value,
                            }))
                          }
                        >
                          {[1, 2, 3, 4, 5].map((week) => (
                            <option key={week} value={week}>
                              {week}째 주
                            </option>
                          ))}
                        </select>
                      </label>
                    ) : null}
                    {holidayForm.holidayType === 'BIWEEKLY' ? (
                      <label>
                        기준 날짜
                        <input
                          type="date"
                          value={holidayForm.referenceDate}
                          onChange={(event) =>
                            setHolidayForm((current) => ({
                              ...current,
                              referenceDate: event.target.value,
                            }))
                          }
                        />
                      </label>
                    ) : null}
                    {holidayForm.holidayType === 'CUSTOM' ? (
                      <label>
                        휴무 날짜
                        <input
                          type="date"
                          value={holidayForm.specificDate}
                          onChange={(event) =>
                            setHolidayForm((current) => ({
                              ...current,
                              specificDate: event.target.value,
                            }))
                          }
                        />
                      </label>
                    ) : null}
                  </S.FormGrid>
                  <S.SecondarySaveButton
                    type="button"
                    onClick={addHoliday}
                    disabled={createHoliday.isPending}
                  >
                    {createHoliday.isPending ? '추가 중...' : '휴무일 추가'}
                  </S.SecondarySaveButton>
                  <S.HolidayList>
                    {holidays.length ? (
                      holidays.map((holiday) => (
                        <S.HolidayItem key={holiday.holidayId}>
                          <span>{holidayLabel(holiday)}</span>
                          <button
                            type="button"
                            onClick={() => setHolidayToDelete(holiday)}
                            aria-label={`${holidayLabel(holiday)} 삭제`}
                          >
                            삭제
                          </button>
                        </S.HolidayItem>
                      ))
                    ) : (
                      <S.EmptyText>등록된 휴무일이 없습니다.</S.EmptyText>
                    )}
                  </S.HolidayList>
                </S.Card>
              </S.Section>

              <S.Section>
                <S.SectionHeading>
                  <h2>담당자별 영업시간</h2>
                  <p>매장 기본 시간과 다른 담당자만 예외 시간을 설정하세요.</p>
                </S.SectionHeading>
                {staffs.length ? (
                  <S.StaffList>
                    {staffs.map((staff) => (
                      <StaffHoursEditor key={staff.staffId} shopId={shopId} staff={staff} />
                    ))}
                  </S.StaffList>
                ) : (
                  <S.ErrorCard>
                    <strong>등록된 담당자가 없습니다.</strong>
                    <span>담당자 등록 기능은 아직 제공되지 않습니다.</span>
                  </S.ErrorCard>
                )}
              </S.Section>
            </>
          )}
        </S.Content>
        <BottomNav />
      </S.PageWrapper>
      <ConfirmDialog
        open={Boolean(holidayToDelete)}
        title="휴무일을 삭제할까요?"
        description={holidayToDelete ? holidayLabel(holidayToDelete) : ''}
        confirmLabel="삭제"
        tone="danger"
        onCancel={() => setHolidayToDelete(null)}
        onConfirm={confirmDeleteHoliday}
      />
    </Container>
  );
}
