using Newtonsoft.Json;
using PGAPP.Cache;
using PGAPP.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Optimization;

namespace PGAPP.Utility
{
    public class BundleManager
    {

        /// <summary>
        /// Lấy đoạn html để render javascript bundle, có kèm version
        /// </summary>
        /// <param name="strBundleName"></param>
        /// <returns></returns>
        public static string GetVersionedScriptBundle(string strBundleName)
        {
            string strUnversioned = Scripts.RenderFormat(StaticData.BUNDLE_FORMAT_SCRIPT, strBundleName).ToString();
            int intVersion = GetBundleVersion(strBundleName);
            string strVersioned = strUnversioned.Replace(".js", ".v" + intVersion + ".js");
            return strVersioned;
        }

        /// <summary>
        /// Lấy đoạn html để render css bundle, có kèm version
        /// </summary>
        /// <param name="strBundleName"></param>
        /// <returns></returns>
        public static string GetVersionedCSSBundle(string strBundleName)
        {
            string strUnversioned = Scripts.RenderFormat(StaticData.BUNDLE_FORMAT_CSS, strBundleName).ToString();
            int intVersion = GetBundleVersion(strBundleName);
            string strVersioned = strUnversioned.Replace(".css", ".v" + intVersion + ".css");
            return strVersioned;
        }

        /// <summary>
        /// Lấy phiên bản của bundle
        /// </summary>
        /// <param name="strBundleName"></param>
        /// <returns></returns>
        private static int GetBundleVersion(string strBundleName)
        {
            BundleVersionModel[] arrBundleVersion = GetBundleVersions();

            foreach (BundleVersionModel objBundleVersion in arrBundleVersion)
            {
                if (objBundleVersion.Bundle == strBundleName)
                {
                    return objBundleVersion.Version;
                }
            }

            return ConfigData.BundleVersion;
        }

        /// <summary>
        /// Lấy toàn bộ bundle và phiên bản, có cache
        /// </summary>
        /// <returns></returns>
        private static BundleVersionModel[] GetBundleVersions()
        {
            CacheManagerProvider<BundleVersionModel[]> objCacheManagerProvider = new CacheManagerProvider<BundleVersionModel[]>();
            ICacheManager<BundleVersionModel[]> objCacheManager = objCacheManagerProvider.GetCacheManager();
            BundleVersionModel[] arrBundleVersion = objCacheManager.Get(CacheKeyRepository.ALL_BUNDLE_VERSION);

            // Nếu lấy cache không có thì đọc file
            if (arrBundleVersion == null)
            {
                string strVersionFileData = File.ReadAllText(HttpContext.Current.Server.MapPath("~/version.txt"));

                // File lưu kiểu JSON
                arrBundleVersion = JsonConvert.DeserializeObject<BundleVersionModel[]>(strVersionFileData);
                objCacheManager.Add(CacheKeyRepository.ALL_BUNDLE_VERSION, arrBundleVersion);
            }

            return arrBundleVersion;
        }
    }
}
