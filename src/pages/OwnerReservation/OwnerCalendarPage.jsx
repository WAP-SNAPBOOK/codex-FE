import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useLocation, useNavigate } from 'react-router-dom';
import AsyncState from '@/components/common/AsyncState';
import BottomNav from '@/components/common/BottomNav';
import { SkeletonBlock } from '@/components/common/Skeleton';
import { useAuth } from '@/context/AuthContext';
import { useShopLink } from '@/query/linkQueries';
import { useOwnerReservationCalendar } from '@/query/reservationQueries';
import * as S from './OwnerCalendarPage.styles';

const PIXELS_PER_MINUTE = 2;
const MIN_BLOCK_HEIGHT = 58;
const STAFF_HEADER_COLORS = ['#FFE8E8', '#FFF1D6', '#E7F5E9', '#E5F1FF', '#EEE9FF', '#FFE8F3'];

const getStaffHeaderColor = (staffId) => {
  const key = String(staffId ?? 'unassigned');
  let hash = 0;

  for (let index = 0; index < key.length; index += 1) {
    hash = (hash * 31 + key.charCodeAt(index)) >>> 0;
  }

  return STAFF_HEADER_COLORS[hash % STAFF_HEADER_COLORS.length];
};

const toMinutes = (time) => {
  const match = String(time ?? '').match(/(\d{2}):(\d{2})/);
  if (!match) return 0;
  return Number(match[1]) * 60 + Number(match[2]);
};

const formatClock = (value) => {
  const match = String(value ?? '').match(/(\d{2}):(\d{2})/);
  return match ? `${match[1]}:${match[2]}` : '-';
};

const clampDateToMonth = (date, nextMonth) => {
  const targetMonth = nextMonth.startOf('month');
  const day = Math.min(date.date(), targetMonth.daysInMonth());
  return targetMonth.date(day);
};

const getStatusText = (status) => (status === 'PENDING' ? '대기' : '확정');

const layoutReservations = (reservations = []) => {
  const sorted = [...reservations].sort((a, b) => toMinutes(a.startAt) - toMinutes(b.startAt));
  const active = [];

  return sorted.map((reservation) => {
    const start = toMinutes(reservation.startAt);
    const end = toMinutes(reservation.endAt);

    for (let index = active.length - 1; index >= 0; index -= 1) {
      if (active[index].end <= start) {
        active.splice(index, 1);
      }
    }

    const usedSlots = new Set(active.map((item) => item.slot));
    let slot = 0;
    while (usedSlots.has(slot)) slot += 1;

    const overlapGroupSize = Math.max(active.length + 1, slot + 1);
    const item = { ...reservation, start, end, slot, overlapGroupSize };
    active.push(item);
    active.forEach((activeItem) => {
      activeItem.overlapGroupSize = Math.max(activeItem.overlapGroupSize, overlapGroupSize);
    });

    return item;
  });
};

export default function OwnerCalendarPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  const isOwner = auth?.userType === 'OWNER';
  const [selectedDate, setSelectedDate] = useState(() =>
    location.state?.calendarDate ? dayjs(location.state.calendarDate) : dayjs()
  );
  const [selectedStaffId, setSelectedStaffId] = useState(() => location.state?.staffId ?? null);
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
  const [pickerYear, setPickerYear] = useState(() => dayjs().year());

  const {
    data: shopLink,
    isLoading: isShopLoading,
    isError: isShopError,
    refetch: refetchShop,
  } = useShopLink({ enabled: isOwner });
  const shopId = shopLink?.shopId ?? null;
  const dateText = selectedDate.format('YYYY-MM-DD');

  const {
    data: calendar,
    isLoading: isCalendarLoading,
    isError: isCalendarError,
    refetch: refetchCalendar,
  } = useOwnerReservationCalendar(shopId, {
    date: dateText,
    staffId: selectedStaffId,
  });

  const timeline = calendar?.timeline;
  const columns = timeline?.staffColumns ?? [];
  const startMinutes = toMinutes(timeline?.startTime ?? '09:00');
  const endMinutes = Math.max(toMinutes(timeline?.endTime ?? '21:00'), startMinutes + 60);
  const timelineHeight = (endMinutes - startMinutes) * PIXELS_PER_MINUTE;
  const timeTicks = useMemo(() => {
    const ticks = [];
    for (let minute = startMinutes; minute <= endMinutes; minute += 30) {
      ticks.push({
        minute,
        label: minute % 60 === 0 ? `${String(Math.floor(minute / 60)).padStart(2, '0')}:00` : '',
        half: minute % 60 !== 0,
      });
    }
    return ticks;
  }, [endMinutes, startMinutes]);

  const staffOptions = useMemo(
    () => (calendar?.timeline?.staffColumns ?? []).filter((column) => !column.unassigned),
    [calendar]
  );
  const moveWeek = (delta) => {
    setSelectedDate((current) => current.add(delta, 'week'));
  };

  const goToToday = () => {
    setSelectedDate(dayjs());
  };

  const selectDay = (date) => {
    setSelectedDate(dayjs(date));
  };

  const openMonthPicker = () => {
    setPickerYear(selectedDate.year());
    setIsMonthPickerOpen(true);
  };

  const selectMonth = (monthIndex) => {
    const targetMonth = selectedDate.year(pickerYear).month(monthIndex);
    setSelectedDate((current) => clampDateToMonth(current, targetMonth));
    setIsMonthPickerOpen(false);
  };

  const retryCalendar = () => {
    if (isShopError) {
      refetchShop();
      return;
    }

    refetchCalendar();
  };

  if (!isOwner) {
    return <S.EmptyState>점주 계정만 예약 캘린더를 확인할 수 있습니다.</S.EmptyState>;
  }

  return (
    <S.Page>
      <S.Header>
        <S.PageHeading>
          <S.PageTitle>예약 캘린더</S.PageTitle>
          <S.PageDescription>날짜와 담당자별 예약 일정을 확인하세요.</S.PageDescription>
        </S.PageHeading>
        <S.MonthBar>
          <S.MonthButton
            type="button"
            aria-haspopup="dialog"
            aria-expanded={isMonthPickerOpen}
            onClick={openMonthPicker}
          >
            {selectedDate.format('YYYY년 M월')}
            <span>⌄</span>
          </S.MonthButton>
          <S.MonthControls>
            <S.TodayButton type="button" onClick={goToToday}>
              오늘
            </S.TodayButton>
            <S.IconButton type="button" aria-label="이전 주" onClick={() => moveWeek(-1)}>
              ‹
            </S.IconButton>
            <S.IconButton type="button" aria-label="다음 주" onClick={() => moveWeek(1)}>
              ›
            </S.IconButton>
          </S.MonthControls>
        </S.MonthBar>

        {staffOptions.length > 1 ? (
          <S.StaffFilter aria-label="담당 직원 필터">
            <S.StaffChip
              type="button"
              $selected={selectedStaffId === null}
              onClick={() => setSelectedStaffId(null)}
            >
              전체
            </S.StaffChip>
            {staffOptions.map((staff) => (
              <S.StaffChip
                key={staff.staffId}
                type="button"
                $selected={selectedStaffId === staff.staffId}
                onClick={() => setSelectedStaffId(staff.staffId)}
              >
                {staff.staffName}
              </S.StaffChip>
            ))}
          </S.StaffFilter>
        ) : null}

        <S.WeekStrip>
          {(calendar?.days ?? []).map((day) => (
            <S.DayButton
              key={day.date}
              type="button"
              $selected={day.selected}
              onClick={() => selectDay(day.date)}
            >
              <S.DayLabel>{day.dayLabel}</S.DayLabel>
              <S.DayNumber>{day.dayOfMonth}</S.DayNumber>
              {day.hasPending || day.hasConfirmed ? (
                <S.DayBadge $pending={day.hasPending} aria-hidden="true" />
              ) : null}
            </S.DayButton>
          ))}
        </S.WeekStrip>
      </S.Header>

      {isShopLoading || isCalendarLoading ? (
        <S.CalendarLoading role="status" aria-label="예약 캘린더를 불러오는 중">
          <SkeletonBlock $width="100%" $height="82px" $radius="18px" />
          <SkeletonBlock $width="58%" $height="16px" />
          <SkeletonBlock $width="100%" $height="360px" $radius="18px" />
        </S.CalendarLoading>
      ) : isShopError || isCalendarError ? (
        <AsyncState
          compact
          variant="error"
          title="예약 캘린더를 불러오지 못했어요"
          description="네트워크 상태를 확인한 뒤 다시 시도해주세요."
          actionLabel="다시 시도"
          onAction={retryCalendar}
        />
      ) : columns.length === 0 ? (
        <AsyncState
          compact
          title="표시할 일정이 없어요"
          description="선택한 날짜의 영업 일정과 담당자 정보를 확인해주세요."
          actionLabel="오늘 일정 보기"
          onAction={goToToday}
        />
      ) : (
        <S.Body>
          <S.TimelineGrid $columns={columns.length}>
            {columns.length > 1 ? (
              <S.StaffHeader $columns={columns.length}>
                {columns.map((column) => (
                  <S.StaffHeaderCell
                    key={column.staffId ?? 'unassigned'}
                    $background={getStaffHeaderColor(column.staffId)}
                  >
                    {column.staffName}
                  </S.StaffHeaderCell>
                ))}
              </S.StaffHeader>
            ) : null}

            <S.TimeAxis style={{ height: timelineHeight }}>
              {timeTicks
                .filter((tick) => tick.label)
                .map((tick) => (
                  <S.TimeLabel
                    key={tick.minute}
                    $top={(tick.minute - startMinutes) * PIXELS_PER_MINUTE}
                  >
                    {tick.label}
                  </S.TimeLabel>
                ))}
            </S.TimeAxis>

            <S.Columns $columns={columns.length}>
              {columns.map((column) => {
                const reservations = layoutReservations(column.reservations ?? []);
                return (
                  <S.StaffColumn key={column.staffId ?? 'unassigned'} $height={timelineHeight}>
                    {timeTicks.map((tick) => (
                      <S.HourLine
                        key={tick.minute}
                        $half={tick.half}
                        $top={(tick.minute - startMinutes) * PIXELS_PER_MINUTE}
                      />
                    ))}
                    {(column.unavailableRanges ?? []).map((range) => {
                      const top = (toMinutes(range.startTime) - startMinutes) * PIXELS_PER_MINUTE;
                      const height =
                        (toMinutes(range.endTime) - toMinutes(range.startTime)) * PIXELS_PER_MINUTE;
                      return (
                        <S.UnavailableRange
                          key={`${range.startTime}-${range.endTime}`}
                          $top={Math.max(top, 0)}
                          $height={Math.max(height, 0)}
                        />
                      );
                    })}
                    {reservations.map((reservation) => {
                      const top = (reservation.start - startMinutes) * PIXELS_PER_MINUTE;
                      const height = Math.max(
                        (reservation.displayDurationMinutes ?? 30) * PIXELS_PER_MINUTE,
                        MIN_BLOCK_HEIGHT
                      );
                      const width = 100 / reservation.overlapGroupSize;
                      const left = reservation.slot * width;

                      return (
                        <S.ReservationBlock
                          key={reservation.reservationId}
                          type="button"
                          $status={reservation.status}
                          $top={Math.max(top, 0)}
                          $height={height}
                          $left={left}
                          $width={width}
                          onClick={() =>
                            navigate(`/reservations/${reservation.reservationId}`, {
                              state: {
                                calendarDate: selectedDate.format('YYYY-MM-DD'),
                                staffId: selectedStaffId,
                              },
                            })
                          }
                        >
                          <S.ReservationName>{reservation.customerName}</S.ReservationName>
                          <S.ReservationMeta>
                            {formatClock(reservation.startAt)} - {formatClock(reservation.endAt)}
                            <br />
                            {reservation.menuSummary ||
                              reservation.representativeMenuName ||
                              '메뉴 없음'}
                          </S.ReservationMeta>
                          <S.StatusLabel $status={reservation.status}>
                            {getStatusText(reservation.status)}
                          </S.StatusLabel>
                        </S.ReservationBlock>
                      );
                    })}
                  </S.StaffColumn>
                );
              })}
            </S.Columns>
          </S.TimelineGrid>
        </S.Body>
      )}

      <BottomNav />

      {isMonthPickerOpen ? (
        <MonthPicker
          selectedDate={selectedDate}
          year={pickerYear}
          onYearChange={setPickerYear}
          onMonthSelect={selectMonth}
          onClose={() => setIsMonthPickerOpen(false)}
        />
      ) : null}
    </S.Page>
  );
}

function MonthPicker({ selectedDate, year, onYearChange, onMonthSelect, onClose }) {
  const currentYear = dayjs().year();
  const startYear = 2018;
  const endYear = currentYear + 1;
  const years = Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index);

  return (
    <S.MonthPickerOverlay role="presentation" onClick={onClose}>
      <S.MonthPickerSheet
        role="dialog"
        aria-modal="true"
        aria-labelledby="month-picker-title"
        onClick={(event) => event.stopPropagation()}
      >
        <S.SheetHandle />
        <S.MonthPickerHeader>
          <S.SheetTitle id="month-picker-title">년·월 선택</S.SheetTitle>
          <S.SheetClose type="button" aria-label="닫기" onClick={onClose}>
            ×
          </S.SheetClose>
        </S.MonthPickerHeader>

        <S.YearSelect
          value={year}
          aria-label="연도 선택"
          onChange={(event) => onYearChange(Number(event.target.value))}
        >
          {years.map((optionYear) => (
            <option key={optionYear} value={optionYear}>
              {optionYear}년
            </option>
          ))}
        </S.YearSelect>

        <S.MonthGrid>
          {Array.from({ length: 12 }, (_, monthIndex) => {
            const isSelected = selectedDate.year() === year && selectedDate.month() === monthIndex;
            return (
              <S.MonthOption
                key={monthIndex}
                type="button"
                $selected={isSelected}
                aria-pressed={isSelected}
                onClick={() => onMonthSelect(monthIndex)}
              >
                {monthIndex + 1}월
              </S.MonthOption>
            );
          })}
        </S.MonthGrid>
      </S.MonthPickerSheet>
    </S.MonthPickerOverlay>
  );
}
