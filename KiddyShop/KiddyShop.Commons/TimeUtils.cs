using System;
using System.Globalization;

namespace KiddyShop.Commons
{
    /// <summary>
    ///     Time Utilities class provides date and time related routines.
    /// </summary>
    public static class TimeUtils
    {
        public static DateTime MinDateValue = new DateTime(1900, 1, 1, 0, 0, 0, 0, CultureInfo.InvariantCulture.Calendar,
            DateTimeKind.Utc);

        /// <summary>
        ///     Displays a date in friendly format.
        /// </summary>
        /// <param name="date"></param>
        /// <param name="showTime"></param>
        /// <returns>Today,Yesterday,Day of week or a string day (Jul 15, 2008)</returns>
        public static string FriendlyDateString(DateTime date, bool showTime)
        {
            if (date < MinDateValue)
                return string.Empty;

            string formattedDate;
            if (date.Date == DateTime.Today)
                formattedDate = "Today"; //Resources.Resources.Today;
            else if (date.Date == DateTime.Today.AddDays(-1))
                formattedDate = "Yesterday"; //Resources.Resources.Yesterday;
            else if (date.Date > DateTime.Today.AddDays(-6))
                // Show the Day of the week
                formattedDate = date.ToString("dddd");
            else
                formattedDate = date.ToString("MMMM dd, yyyy");

            if (showTime)
                formattedDate += " @ " + date.ToString("t").ToLower().Replace(" ", "");

            return formattedDate;
        }

        /// <summary>
        ///     Returns a short date time string
        /// </summary>
        /// <param name="date"></param>
        /// <param name="showTime"></param>
        /// <returns></returns>
        public static string ShortDateString(DateTime date, bool showTime = false)
        {
            if (date < MinDateValue)
                return string.Empty;

            string dateString = date.ToString("MMM dd, yyyy");
            if (!showTime)
                return dateString;

            return dateString + " - " + date.ToString("h:mmtt").ToLower();
        }

        /// <summary>
        ///     Returns a short date time string
        /// </summary>
        /// <param name="date"></param>
        /// <param name="showTime"></param>
        /// <returns></returns>
        public static string ShortDateString(DateTime? date, bool showTime)
        {
            if (date == null)
                return string.Empty;

            return ShortDateString(date.Value, showTime);
        }

        /// <summary>
        ///     Displays a number of milliseconds as friendly seconds, hours, minutes
        ///     Pass -1 to get a blank date.
        /// </summary>
        /// <param name="milliSeconds">the elapsed milliseconds to display time for</param>
        /// <returns>string in format of just now or 1m ago, 2h ago</returns>
        public static string FriendlyElapsedTimeString(int milliSeconds)
        {
            if (milliSeconds < 0)
                return string.Empty;

            if (milliSeconds < 60000)
                return "just now";

            if (milliSeconds < 3600000)
                return (milliSeconds / 60000) + "m ago";

            return milliSeconds / 3600000 + "h ago";
        }

        /// <summary>
        ///     Displays the elapsed time  friendly seconds, hours, minutes
        /// </summary>
        /// <param name="elapsed">Timespan of elapsed time</param>
        /// <returns>string in format of just now or 1m ago, 2h ago</returns>
        public static string FriendlyElapsedTimeString(TimeSpan elapsed)
        {
            return FriendlyElapsedTimeString((int)elapsed.TotalMilliseconds);
        }

        /// <summary>
        ///     Converts a fractional hour value like 1.25 to 1:15  hours:minutes format
        /// </summary>
        /// <param name="hours">Decimal hour value</param>
        /// <param name="format">An optional format string where {0} is hours and {1} is minutes (ie: "{0}h:{1}m").</param>
        /// <returns></returns>
        public static string FractionalHoursToString(decimal hours, string format)
        {
            if (string.IsNullOrEmpty(format))
                format = "{0}:{1}";

            TimeSpan tspan = TimeSpan.FromHours((double)hours);

            // Account for rounding error
            int minutes = tspan.Minutes;
            if (tspan.Seconds > 29)
                minutes++;

            return string.Format(format, tspan.Hours + tspan.Days * 24, minutes);
        }

        /// <summary>
        ///     Converts a fractional hour value like 1.25 to 1:15  hours:minutes format
        /// </summary>
        /// <param name="hours">Decimal hour value</param>
        public static string FractionalHoursToString(decimal hours)
        {
            return FractionalHoursToString(hours, null);
        }

        /// <summary>
        ///     Rounds an hours value to a minute interval
        ///     0 means no rounding
        /// </summary>
        /// <param name="hours"></param>
        /// <param name="minuteInterval">Minutes to round up or down to</param>
        /// <param name="direction"></param>
        /// <returns></returns>
        public static decimal RoundDateToMinuteInterval(decimal hours, int minuteInterval,
            RoundingDirection direction)
        {
            if (minuteInterval == 0)
                return hours;

            decimal fraction = 60 / minuteInterval;

            switch (direction)
            {
                case RoundingDirection.Round:
                    return Math.Round(hours * fraction, 0) / fraction;

                case RoundingDirection.RoundDown:
                    return Math.Truncate(hours * fraction) / fraction;
            }
            return Math.Ceiling(hours * fraction) / fraction;
        }

        /// <summary>
        ///     Rounds a date value to a given minute interval
        /// </summary>
        /// <param name="time">Original time value</param>
        /// <param name="minuteInterval">Number of minutes to round up or down to</param>
        /// <param name="direction"></param>
        /// <returns></returns>
        public static DateTime RoundDateToMinuteInterval(DateTime time, int minuteInterval,
            RoundingDirection direction)
        {
            if (minuteInterval == 0)
                return time;

            var interval = (decimal)minuteInterval;
            var actMinute = (decimal)time.Minute;

            if (actMinute == 0.00M)
                return time;

            int newMinutes = 0;

            switch (direction)
            {
                case RoundingDirection.Round:
                    newMinutes = (int)(Math.Round(actMinute / interval, 0) * interval);
                    break;

                case RoundingDirection.RoundDown:
                    newMinutes = (int)(Math.Truncate(actMinute / interval) * interval);
                    break;

                case RoundingDirection.RoundUp:
                    newMinutes = (int)(Math.Ceiling(actMinute / interval) * interval);
                    break;
            }

            // strip time
            time = time.AddMinutes(time.Minute * -1);
            time = time.AddSeconds(time.Second * -1);
            time = time.AddMilliseconds(time.Millisecond * -1);

            // add new minutes back on
            return time.AddMinutes(newMinutes);
        }

        /// <summary>
        ///     Creates a DateTime value from date and time input values
        /// </summary>
        /// <param name="date"></param>
        /// <param name="time"></param>
        /// <returns></returns>
        public static DateTime DateTimeFromDateAndTime(string date, string time)
        {
            return DateTime.Parse(date + " " + time);
        }

        /// <summary>
        ///     Creates a DateTime Value from a DateTime date and a string time value.
        /// </summary>
        /// <param name="date"></param>
        /// <param name="time"></param>
        /// <returns></returns>
        public static DateTime DateTimeFromDateAndTime(DateTime date, string time)
        {
            return DateTime.Parse(date.ToShortDateString() + " " + time);
        }

        /// <summary>
        ///     Converts the passed date time value to Mime formatted time string
        /// </summary>
        /// <param name="time"></param>
        public static string MimeDateTime(DateTime time)
        {
            TimeSpan offset = TimeZone.CurrentTimeZone.GetUtcOffset(time);

            string sOffset;
            if (offset.Hours < 0)
                sOffset = "-" + (offset.Hours * -1).ToString(CultureInfo.InvariantCulture).PadLeft(2, '0');
            else
                sOffset = "+" + offset.Hours.ToString(CultureInfo.InvariantCulture).PadLeft(2, '0');

            sOffset += offset.Minutes.ToString(CultureInfo.InvariantCulture).PadLeft(2, '0');

            return "Date: " + time.ToString("ddd, dd MMM yyyy HH:mm:ss",
                CultureInfo.InvariantCulture) +
                   " " + sOffset;
        }
    }

    /// <summary>
    ///     Determines how date time values are rounded
    /// </summary>
    public enum RoundingDirection
    {
        RoundUp,
        RoundDown,
        Round
    }
}