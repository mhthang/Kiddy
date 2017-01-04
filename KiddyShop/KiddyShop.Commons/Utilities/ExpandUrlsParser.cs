using System;
using System.Text.RegularExpressions;

namespace KiddyShop.Commons.Utilities
{
    /// <summary>
    ///     Internally used class that is used to expand links in text
    ///     strings.
    /// </summary>
    internal class ExpandUrlsParser
    {
        public bool ParseFormattedLinks = false;
        public string Target = string.Empty;

        /// <summary>
        ///     Expands links into HTML hyperlinks inside of text or HTML.
        /// </summary>
        /// <param name="text">The text to expand</param>
        /// <returns></returns>
        public string ExpandUrls(string text)
        {
            MatchEvaluator matchEval;
            string pattern;
            string updated;

            // Expand embedded hyperlinks
            const RegexOptions options = RegexOptions.Multiline |
                                         RegexOptions.IgnoreCase;
            if (ParseFormattedLinks)
            {
                pattern = @"\[(.*?)\|(.*?)]";

                matchEval = ExpandFormattedLinks;
                updated = Regex.Replace(text, pattern, matchEval, options);
            }
            else
                updated = text;

            pattern =
                @"([""'=]|&quot;)?(http://|ftp://|https://|www\.|ftp\.[\w]+)([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])";

            matchEval = ExpandUrlsRegExEvaluator;
            updated = Regex.Replace(updated, pattern, matchEval, options);

            return updated;
        }

        /// <summary>
        ///     Internal RegExEvaluator callback
        /// </summary>
        /// <param name="m"></param>
        /// <returns></returns>
        private string ExpandUrlsRegExEvaluator(Match m)
        {
            string href = m.Value; // M.Groups[0].Value;

            // if string starts within an HREF don't expand it
            if (href.StartsWith("=") ||
                href.StartsWith("'") ||
                href.StartsWith("\"") ||
                href.StartsWith("&quot;"))
                return href;

            string text = href;

            if (href.IndexOf("://", StringComparison.Ordinal) < 0)
            {
                if (href.StartsWith("www."))
                    href = "http://" + href;
                else if (href.StartsWith("ftp"))
                    href = "ftp://" + href;
                else if (href.IndexOf("@", StringComparison.Ordinal) > -1)
                    href = "mailto:" + href;
            }

            string targ = !string.IsNullOrEmpty(Target) ? " target='" + Target + "'" : string.Empty;

            return "<a href='" + href + "'" + targ +
                   ">" + text + "</a>";
        }

        private string ExpandFormattedLinks(Match m)
        {
            //string Href = M.Value; // M.Groups[0].Value;

            string text = m.Groups[1].Value;
            string href = m.Groups[2].Value;

            if (href.IndexOf("://", StringComparison.Ordinal) < 0)
            {
                if (href.StartsWith("www."))
                    href = "http://" + href;
                else if (href.StartsWith("ftp"))
                    href = "ftp://" + href;
                else if (href.IndexOf("@", StringComparison.Ordinal) > -1)
                    href = "mailto:" + href;
                else
                    href = "http://" + href;
            }

            string targ = !string.IsNullOrEmpty(Target) ? " target='" + Target + "'" : string.Empty;

            return "<a href='" + href + "'" + targ +
                   ">" + text + "</a>";
        }
    }
}