using System;
using System.Collections.Generic;
using System.Linq;

namespace KiddyShop.Commons
{
    public static class Ultility
    {
        public static string GetHighlightColor(Random rand)
        {
            int select = rand.Next(Constants.HighlightColors.Length);

            return Constants.HighlightColors[select];
        }

        public static string NormalizeSqlString(string source)
        {
            if (!String.IsNullOrEmpty(source))
                source = source.Trim();
            return source;
        }

        public static bool IsValidEmailAddress(string emailAddress)
        {
            if (!String.IsNullOrEmpty(emailAddress))
                return System.Text.RegularExpressions.Regex.IsMatch(emailAddress, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z", System.Text.RegularExpressions.RegexOptions.IgnoreCase);
            return false;
        }

        public static int GetUnixTimestamp()
        {
            Int32 unixTimestamp = (Int32)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1))).TotalSeconds;
            return unixTimestamp;
        }

        public static List<String> GetMatches(String source)
        {
            List<String> keys = new List<string>();

            string pattern = @"{{(.+?)}}";
            System.Text.RegularExpressions.MatchCollection mc = System.Text.RegularExpressions.Regex.Matches(source, pattern);
            foreach (System.Text.RegularExpressions.Match m in mc)
            {
                keys.Add(m.Value);
            }

            return keys;
        }

        public static DateTime GetStartOfWeek(DateTime dt, DayOfWeek startOfWeek)
        {
            int diff = dt.DayOfWeek - startOfWeek;
            if (diff < 0)
            {
                diff += 7;
            }

            return dt.AddDays(-1 * diff).Date;
        }

        public static DateTime GetNextWeekday(DateTime start, DayOfWeek day)
        {
            // The (... + 7) % 7 ensures we end up with a value in the range [0, 6]
            int daysToAdd = ((int)day - (int)start.DayOfWeek + 7) % 7;
            return start.AddDays(daysToAdd);
        }

        public static int MonthDifference(this DateTime lValue, DateTime rValue)
        {
            return (lValue.Month - rValue.Month) + 12 * (lValue.Year - rValue.Year);
        }

        public static double DayDifference(this DateTime lValue, DateTime rValue)
        {
            return (lValue - rValue).TotalDays;
        }

        public static DateTime GetFirstDateOfMonth(DateTime dateTime)
        {
            return new DateTime(dateTime.Year, dateTime.Month, 1);
        }

        public static DateTime GetLastDateOfMonth(DateTime dateTime)
        {
            return new DateTime(dateTime.Year, dateTime.Month, DateTime.DaysInMonth(dateTime.Year, dateTime.Month));
        }

        public static string GetFullName(string firstName, string lastName)
        {
            string fullName = String.Format("{0} {1}", firstName, lastName);
            return fullName.Trim();
        }

        public static string GetPathFromEmailAndId(string id, string email)
        {
            string path = String.Empty;

            if (!String.IsNullOrEmpty(email) && !String.IsNullOrEmpty(id))
            {
                System.Net.Mail.MailAddress addr = new System.Net.Mail.MailAddress(email);
                string username = addr.User;
                int length = 8;
                string subfolder = id.Substring(0, length);

                path = String.Format(@"{0}\{1}", username, subfolder);
            }
            else
            {
                throw new ArgumentNullException("Id and Email canot be null to create storage path.");
            }

            return path;
        }

        public static bool IsPhotoFile(string fileExtension)
        {
            string[] photoFileExtensions = new string[] { ".png", ".bmp", ".jpg", ".jpeg", ".gif" };
            if (!String.IsNullOrEmpty(fileExtension) && photoFileExtensions.Contains(fileExtension))
                return true;

            return false;
        }

        public static string GetUserNameFromEmail(string email)
        {
            if (email == null) return null;
            var position = email.IndexOf("@");
            if (position == -1) return email;
            return email.Substring(0, position);
        }
    }
}