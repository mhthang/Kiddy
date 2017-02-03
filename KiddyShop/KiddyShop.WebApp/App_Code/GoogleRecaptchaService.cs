using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;

namespace KiddyShop.WebApp
{
    public class GoogleRecaptchaService
    {
        public static bool VerifyCaptcha(string captchaResponse)
        {
            bool result = false;

            if (String.IsNullOrEmpty(captchaResponse))
            {
                return result;
            }

            string responseFromServer = "";
            string googleRecaptchaUri = System.Configuration.ConfigurationManager.AppSettings["googlerecaptcha:Uri"];
            string googleRecaptchaSecretKey = System.Configuration.ConfigurationManager.AppSettings["googlerecaptcha:SecretKey"];

            WebRequest request = WebRequest.Create(String.Format(googleRecaptchaUri, googleRecaptchaSecretKey, captchaResponse));
            request.Method = "GET";
            using (WebResponse response = request.GetResponse())
            {
                using (Stream stream = response.GetResponseStream())
                {
                    StreamReader reader = new StreamReader(stream);
                    responseFromServer = reader.ReadToEnd();
                }
            }

            /*string searchUrl = String.Format(googleRecaptchaUri, googleRecaptchaSecretKey, captchaResponse);
            System.Net.Http.HttpClient http = new System.Net.Http.HttpClient();
            http.DefaultRequestHeaders.Add("accept", "application/json");
            responseFromServer = http.GetStringAsync(searchUrl).Result;
            */

            if (responseFromServer != "")
            {
                bool isSuccess = false;
                //Dictionary<string, string> values = JsonConvert.DeserializeObject<Dictionary<string, string>>(responseFromServer);
                var values = (JObject)JsonConvert.DeserializeObject(responseFromServer);
                var obj = values["success"];
                if (obj != null)
                {
                    isSuccess = obj.ToObject<Boolean>();
                }

                if (isSuccess)
                {
                    //do something
                    result = true;
                }
                else
                {
                    //return reCaptcha error
                    result = false;
                }

            }

            return result;
        }
    }
}