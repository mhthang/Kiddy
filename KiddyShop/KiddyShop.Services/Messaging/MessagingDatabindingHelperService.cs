using KiddyShop.Domain;
using KiddyShop.Messaging.Models;
using KiddyShop.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Messaging.Services
{
    public class MessagingDatabindingHelperService : BaseService, IMessagingDatabindingHelperService
    {
        public MessagingDatabindingHelperService(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }

        public String bind(String source, Dictionary<string, string> values)
        {
            String result = source;
            if (!String.IsNullOrEmpty(source))
            {
                List<String> keys = Commons.Ultility.GetMatches(source);
                if (keys.Count > 0)
                {
                    // Get from dynamic binding
                    if (values != null)
                    {
                        List<String> removeKeys = new List<string>();
                        foreach (String key in keys)
                        {
                            if (values.ContainsKey(key))
                            {
                                result = result.Replace(key, values[key]);
                                removeKeys.Add(key);
                            }
                        }

                        foreach (String removeKey in removeKeys)
                        {
                            keys.Remove(removeKey);
                        }
                    }

                    // Get from database
                    List<MessagingDataMapping> mapping = this.UnitOfWork.MessagingDataMappingRepository.GetAll().Where(x => keys.Contains(x.TokenKey)).ToList();

                    foreach (MessagingDataMapping map in mapping)
                    {
                        if (!String.IsNullOrEmpty(map.Value))
                        {
                            if (values != null && values.ContainsKey(map.Value))
                            {
                                result = result.Replace(map.TokenKey, values[map.Value]);
                            }
                            else
                            {
                                result = result.Replace(map.TokenKey, map.Value);
                            }
                        }
                        else
                        {
                            if (!String.IsNullOrEmpty(map.SqlQuery))
                            {
                                string val = String.Empty;
                                if (!String.IsNullOrEmpty(map.RequiredColumnName) && values.ContainsKey(map.RequiredColumnName))
                                {
                                    val = values[map.RequiredColumnName];
                                }

                                string sqlQuery = String.Format(map.SqlQuery, val);

                                //var queryResult = this.UnitOfWork._dbContextProvider.DbContext.Database.SqlQuery<string>(sqlQuery).FirstOrDefault();
                                string queryResult = null;

                                if (queryResult != null)
                                {
                                    result = result.Replace(map.TokenKey, queryResult.ToString());
                                }
                            }
                        }
                    }
                }
            }
            return result;
        }
    }
}
