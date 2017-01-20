namespace MobileApp.Models
{
    public class ResponseModel
    {
        public string ErrorMessage { get; set; }
        public string DataTable { get; set; }
        public object Result { get; set; }
        public string LoginError { get; set; }

        public ResponseModel(string strErrorMessage, string strDataTable, object objResult)
        {
            ErrorMessage = strErrorMessage;
            DataTable = strDataTable;
            Result = objResult;
        }

        public ResponseModel(string strLoginError)
        {
            LoginError = strLoginError;
        }
    }
}