﻿using KiddyShop.Security.Commons;
using System;
using System.ComponentModel.DataAnnotations;

namespace KiddyShop.WebSecurity.Models
{
    public class ChangePassword
    {
        [Required(AllowEmptyStrings = false)]
        public string OldPassword { get; set; }

        [Required(AllowEmptyStrings = false)]
        [DataType(DataType.Password)]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}", ErrorMessage = Constants.CHANGE_PASSWORD_INVALID_NEWPASSWORD)]
        public string NewPassword { get; set; }

        [Required(AllowEmptyStrings = false)]
        public string ConfirmNewPassword { get; set; }

    }
}