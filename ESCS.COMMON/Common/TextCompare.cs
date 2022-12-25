using F23.StringSimilarity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ESCS.COMMON.Common
{
    public class TextCompare
    {
        public static double CalculateSimilarity(string source, string target)
        {
            if ((source == null) || (target == null)) return 0.0;
            if ((source.Length == 0) || (target.Length == 0)) return 0.0;
            source = ConvertSource(source);
            target = ConvertTarget(target);
            var jw = new RatcliffObershelp();
            return jw.Similarity(source, target);
        }

        #region Chuẩn hóa tên, tiêu đề cho SEO
        private static string[] a = new string[] { "à", "á", "ạ", "ả", "ã", "â", "ầ", "ấ", "ậ", "ẩ", "ẫ", "ă", "ắ", "ằ", "ắ", "ặ", "ẳ", "ẵ", "a" };
        private static string[] d = new string[] { "đ", "d" };
        private static string[] e = new string[] { "è", "é", "ẹ", "ẻ", "ẽ", "ê", "ề", "ế", "ệ", "ể", "ễ", "e" };
        private static string[] ii = new string[] { "ì", "í", "ị", "ỉ", "ĩ", "i" };
        private static string[] y = new string[] { "ỳ", "ý", "ỵ", "ỷ", "ỹ", "y" };
        private static string[] o = new string[] { "ò", "ó", "ọ", "ỏ", "õ", "ô", "ồ", "ố", "ộ", "ổ", "ỗ", "ơ", "ờ", "ớ", "ợ", "ở", "ỡ", "o" };
        private static string[] u = new string[] { "ù", "ú", "ụ", "ủ", "ũ", "ừ", "ứ", "ự", "ử", "ữ", "u", "ư" };
       
        public static string ConvertTarget(string target)
        {
            string result = "";
            string currentchar = "";
            target = target.ToLower().Trim();
            target = target.Replace("-", "");
            target = target.Replace("+", "");
            target = target.Replace(")", "");
            target = target.Replace("(", "");
            target = target.Replace("*", "");
            target = target.Replace("[", "");
            target = target.Replace("]", "");
            target = target.Replace("}", "");
            target = target.Replace("{", "");
            target = target.Replace(">", "");
            target = target.Replace("<", "");
            target = target.Replace("=", "");
            target = target.Replace(":", "");
            target = target.Replace(",", "");
            target = target.Replace("'", "");
            target = target.Replace("\"", "");
            target = target.Replace("/", "");
            target = target.Replace("\\", "");
            target = target.Replace("&", "");
            target = target.Replace("?", "");
            target = target.Replace(";", "");
            int len = target.Length;
            if (target.Length > 0)
            {
                int i;
                for (i = 0; i < len; i++)
                {
                    currentchar = target.Substring(i, 1);
                    result = result + ChangeChar(currentchar);
                }
            }
            else
            {
                result = "";
            }
            return result;
        }
        public static string ConvertSource(string source)
        {
            string result = "";
            string currentchar = "";
            source = source.ToLower().Trim();
            source = source.Replace("-", "");
            source = source.Replace("+", "");
            source = source.Replace(")", "");
            source = source.Replace("(", "");
            source = source.Replace("*", "");
            source = source.Replace("[", "");
            source = source.Replace("]", "");
            source = source.Replace("}", "");
            source = source.Replace("{", "");
            source = source.Replace(">", "");
            source = source.Replace("<", "");
            source = source.Replace("=", "");
            source = source.Replace(":", "");
            source = source.Replace(",", "");
            source = source.Replace("'", "");
            source = source.Replace("\"", "");
            source = source.Replace("/", "");
            source = source.Replace("\\", "");
            source = source.Replace("&", "");
            source = source.Replace("?", "");
            source = source.Replace(";", "");
            source = source.Replace("cong", "");
            source = source.Replace("son", "");
            source = source.Replace("thay", "");
            source = source.Replace("han", "");
            source = source.Replace("go", "");
            source = source.Replace("can", "");
            source = source.Replace("sua", "");
            source = source.Replace("phuc hoi", "");
            source = source.Replace("thao", "");
            source = source.Replace("nan", "");
            source = source.Replace("dich vu", "");
            source = source.Replace("mop", "");
            source = source.Replace("xuoc", "");
            source = source.Replace("vo", "");
            int len = source.Length;
            if (source.Length > 0)
            {
                int i;
                for (i = 0; i < len; i++)
                {
                    currentchar = source.Substring(i, 1);
                    result = result + ChangeChar(currentchar);
                }
            }
            else
            {
                result = "";
            }
            return result;
        }
        #endregion
        #region "Chuyển ký tự tiếng việt có dấu thành không dấu"
        public static string ChangeChar(string charinput)
        {
            for (int i = 0; i < a.Length; i++)
            {
                if (a[i].Equals(charinput))
                {
                    return "a";
                }
            }
            for (int i = 0; i < d.Length; i++)
            {
                if (d[i].Equals(charinput))
                {
                    return "d";
                }
            }
            for (int i = 0; i < e.Length; i++)
            {
                if (e[i].Equals(charinput))
                {
                    return "e";
                }
            }
            for (int i = 0; i < ii.Length; i++)
            {
                if (ii[i].Equals(charinput))
                {
                    return "i";
                }
            }
            for (int i = 0; i < y.Length; i++)
            {
                if (y[i].Equals(charinput))
                {
                    return "y";
                }
            }
            for (int i = 0; i < o.Length; i++)
            {
                if (o[i].Equals(charinput))
                {
                    return "o";
                }
            }
            for (int i = 0; i < u.Length; i++)
            {
                if (u[i].Equals(charinput))
                {
                    return "u";
                }
            }
            return charinput;
        }
        #endregion
    }
}

