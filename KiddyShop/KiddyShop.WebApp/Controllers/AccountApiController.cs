using KiddyShop.Account.Models;
using KiddyShop.Account.Services;
using KiddyShop.Application.Models;
using KiddyShop.Common.Models;
using KiddyShop.Email;
using KiddyShop.Security.Identity;
using KiddyShop.Security.Models;
using KiddyShop.WebSecurity.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace KiddyShop.WebApp.Controllers
{
    public class AccountApiController : BaseApiController
    {
        #region Members
        private IAccountService _accountService;
        private IWorkingEmailService _emailService;
        private IProfileService _profileService;

        #endregion Members

        #region Constructor
        public AccountApiController()
        {
        }

        public AccountApiController(IWorkingEmailService emailService,
                                    IAccountService accountService, IProfileService profileService)
        {
            this._accountService = accountService;
            this._emailService = emailService;
            this._profileService = profileService;
        }

        #endregion Constructor

        #region APIs

        [AllowAnonymous]
        public IHttpActionResult GetAllUsers()
        {
            return Ok(UserManager.Users.ToList().Select(u => this.TheModelFactory.Create(u)));
        }

        [Authorize]
        public async Task<IHttpActionResult> GetUserById(string Id)
        {
            var user = await UserManager.FindByIdAsync(Id);
            if (user != null)
            {
                return Ok(this.TheModelFactory.Create(user));
            }
            return NotFound();
        }

        [Authorize]
        public async Task<IHttpActionResult> GetUserByName(string username)
        {
            var user = await UserManager.FindByNameAsync(username);
            if (user != null)
            {
                return Ok(this.TheModelFactory.Create(user));
            }
            return NotFound();
        }

        [Authorize]
        public async Task<IHttpActionResult> CreateUser(Register model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (model == null)
            {
                return BadRequest();
            }
            var user = new ApplicationUser()
            {
                UserName = model.UserName,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email
            };

            IdentityResult addUserResult = await UserManager.CreateAsync(user, model.Password);

            if (!addUserResult.Succeeded)
            {
                return GetErrorResult(addUserResult);
            }

            string code = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);

            var callbackUrl = new Uri(Url.Link("ConfirmEmailRoute", new { userId = user.Id, code = code }));

            await UserManager.SendEmailAsync(user.Id,
                                                    "Confirm your account",
                                                    "Please confirm your account by clicking <a href=\"" + callbackUrl + "\">here</a>");

            Uri locationHeader = new Uri(Url.Link("GetUserById", new { id = user.Id }));

            return Created(locationHeader, TheModelFactory.Create(user));
        }
        [HttpGet]
        [Authorize]
        public async Task<IHttpActionResult> DeleteUser(string id)
        {
            string currentUserId = User.Identity.GetUserId();
            if (id == currentUserId)
            {
                ModelState.AddModelError("", String.Format("You can't delete yourself"));
                return BadRequest(ModelState);
            }
            var appUser = await UserManager.FindByIdAsync(id);
            if (appUser == null)
            {
                ModelState.AddModelError("", String.Format("Id [{0}] does not exist.", id));
                return BadRequest(ModelState);
            }
            var logins = appUser.Logins;
            foreach (var login in logins.ToList())
            {
                await _userManager.RemoveLoginAsync(login.UserId, new UserLoginInfo(login.LoginProvider, login.ProviderKey));
            }
            _accountService.SoftDeleteAccountByIdUser(id);
            IdentityResult result = await UserManager.DeleteAsync(appUser);
            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }
            return Ok();

        }

        [Authorize]
        [HttpPut]
        public async Task<IHttpActionResult> AssignClaimsToUser([FromUri] string id, [FromBody] List<ClaimReturn> claimsToAssign)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var appUser = await UserManager.FindByIdAsync(id);

            if (appUser == null)
            {
                return NotFound();
            }

            foreach (ClaimReturn claimModel in claimsToAssign)
            {
                if (appUser.Claims.Any(c => c.ClaimType == claimModel.Type))
                {
                    await UserManager.RemoveClaimAsync(id, new Claim(claimModel.Type, claimModel.Value, ClaimValueTypes.String));
                }

                await UserManager.AddClaimAsync(id, new Claim(claimModel.Type, claimModel.Value, ClaimValueTypes.String));
            }

            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<IHttpActionResult> RemoveClaimsFromUser([FromUri] string id, [FromBody] List<ClaimReturn> claimsToRemove)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var appUser = await UserManager.FindByIdAsync(id);

            if (appUser == null)
            {
                return NotFound();
            }

            foreach (ClaimReturn claimModel in claimsToRemove)
            {
                if (appUser.Claims.Any(c => c.ClaimType == claimModel.Type))
                {
                    await UserManager.RemoveClaimAsync(id, new Claim(claimModel.Type, claimModel.Value, ClaimValueTypes.String));
                }
            }

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost]
        public bool IsCookieAuth()
        {
            return User.Identity.IsAuthenticated;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IHttpActionResult> Signin(Signin model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(Security.Commons.Constants.LOGIN_INVALID_USERNAME_PASSWORD);
            }
            if (model == null)
            {
                return BadRequest();
            }

            SignInStatus result = await SignInManager.PasswordSignInAsync(model.UserName, model.Password, isPersistent: false, shouldLockout: false);
            switch (result)
            {
                case SignInStatus.Success:
                    {
                        //return Ok(_accountService.LoginReturnToken(model));
                        return Ok();
                    }
                case SignInStatus.Failure:
                default:
                    return BadRequest(Security.Commons.Constants.LOGIN_INVALID_USERNAME_PASSWORD);
            }
        }

        [Authorize]
        [HttpPost]
        public bool Signout()
        {
            try
            {
                HttpContext.Current.GetOwinContext().Authentication.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
                return true;
            }
            catch
            {
                return false;
            }
        }

        [Authorize]
        [HttpPost]
        public IHttpActionResult GetCurrentUserProfile()
        {
            try
            {
                string userId = User.Identity.GetUserId();

                var profile = this._profileService.GetUserProfile(userId);
                return Ok(profile);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<IHttpActionResult> ChangePassword(ChangePassword model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(Security.Commons.Constants.CHANGE_PASSWORD_INVALID_NEWPASSWORD);
            }
            if (model.NewPassword.Trim() != model.ConfirmNewPassword.Trim())
            {
                return BadRequest(Security.Commons.Constants.CHANGE_PASSWORD_CONFIRM_FAIL);
            }

            IdentityResult result = await UserManager.ChangePasswordAsync(User.Identity.GetUserId(), model.OldPassword, model.NewPassword);

            if (!result.Succeeded)
            {
                return BadRequest(Security.Commons.Constants.CHANGE_PASSWORD_TOKEN_EXPIRED);
            }

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IHttpActionResult> NewPassword(NewPasswordModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(Security.Commons.Constants.CHANGE_PASSWORD_INVALID_NEWPASSWORD);
            }

            //#if (!DEBUG)
            var valid = GoogleRecaptchaService.VerifyCaptcha(model.CaptchaResponse);
            if (!valid)
            {
                ModelState.AddModelError("Errors", "Wrong captcha!");
                Logger.Error("Wrong captcha!");
                return BadRequest(ModelState);
            }
            //#endif

            if (model.NewPassword.Trim() != model.ConfirmNewPassword.Trim())
            {
                return BadRequest(Security.Commons.Constants.CHANGE_PASSWORD_CONFIRM_FAIL);
            }

            var token = HttpUtility.UrlDecode(model.Code);
            var result = await UserManager.ResetPasswordAsync(model.UserId, token, model.NewPassword);
            if (!result.Succeeded)
            {
                return BadRequest(Security.Commons.Constants.CHANGE_PASSWORD_TOKEN_EXPIRED);
            }
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IHttpActionResult> ForgotPassword(ForgotPassword model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (model == null)
            {
                return BadRequest();
            }

            //#if (!DEBUG)
            var valid = GoogleRecaptchaService.VerifyCaptcha(model.CaptchaResponse);
            if (!valid)
            {
                ModelState.AddModelError("Errors", "Wrong captcha!");
                Logger.Error("Wrong captcha!");
                return BadRequest(ModelState);
            }
            //#endif

            var user = await UserManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return BadRequest(ModelState);
            }

            string code = await this.UserManager.GeneratePasswordResetTokenAsync(user.Id);
            code = HttpUtility.UrlEncode(code);
            code = HttpUtility.UrlEncode(code);
            string callbackUrl = string.Format("{0}/#/Account/NewPassword/{1}/{2}", KiddyShop.Security.Commons.Constants.CONFIGURATION_ISSUER, user.Id, code);
            var returnSendMail = _emailService.SendForgotPasswordEmail(user.Email, callbackUrl);
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IHttpActionResult> Register(Register model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (model == null)
            {
                return BadRequest();
            }

            //#if (!DEBUG)
            var valid = GoogleRecaptchaService.VerifyCaptcha(model.CaptchaResponse);
            if (!valid)
            {
                ModelState.AddModelError("Errors", "Wrong captcha!");
                Logger.Error("Wrong captcha!");
                return BadRequest(ModelState);
            }
            //#endif
            var user = new ApplicationUser()
            {
                UserName = model.UserName,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
            };

            IdentityResult addUserResult = await this.UserManager.CreateAsync(user, model.Password);

            if (!addUserResult.Succeeded)
            {
                return GetErrorResult(addUserResult);
            }

            var result = this._accountService.CreateAccountProfileForUser(user.Id);
            if (!result)
            {
                IdentityResult deleteUserResult = await this.UserManager.DeleteAsync(user);
                return BadRequest();
            }
            string code = await this.UserManager.GenerateEmailConfirmationTokenAsync(user.Id);

            var callbackUrl = new Uri(Url.Link("ConfirmEmailRouter", new { userId = user.Id, code = code }));

            //await _emailService.SendEmailConfig(user.Email, callbackUrl.ToString());

            return Ok();
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("ConfirmEmail", Name = "ConfirmEmailRouter")]
        public async Task<IHttpActionResult> ConfirmEmail(string userId = "", string code = "")
        {
            if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(code))
            {
                ModelState.AddModelError("", "User Id and Code are required");
                return BadRequest(ModelState);
            }

            IdentityResult result = await this.UserManager.ConfirmEmailAsync(userId, code);

            if (result.Succeeded)
            {
                return Ok();
            }
            else
            {
                return GetErrorResult(result);
            }
        }

        protected IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        string normalizedErrorMessage = this.NormalizeErrorMessage(error);
                        ModelState.AddModelError("", normalizedErrorMessage);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }


        [Authorize]
        [HttpPost]
        public IHttpActionResult ChangeCurrentUserPhoto(UserPhoto userPhoto)
        {
            try
            {
                string userId = User.Identity.GetUserId();
                this._profileService.ChangeUserAvatarPhoto(userId, userPhoto);
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<IHttpActionResult> UpdateCurrentUserProfile(ProfileModel model)
        {
            try
            {
                string userId = User.Identity.GetUserId();

                this._profileService.UpdateUserProfile(model);

                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        private string NormalizeErrorMessage(string errorMessage)
        {
            string normalizedErrorMessage = errorMessage;
            string pattern_pre = @"Name";
            string pattern_post = @"is already taken";
            string pattern = string.Format(@"{0} \w+ {1}", pattern_pre, pattern_post);

            Match m = Regex.Match(normalizedErrorMessage, pattern);

            string userName = string.Empty;

            if (m.Success)
            {
                string msg = m.Value;
                msg = msg.Remove(0, pattern_pre.Length);
                msg = msg.Replace(pattern_post, "");

                userName = msg.Trim();
                normalizedErrorMessage = string.Format("Username {0} is already taken", userName);
            }

            return normalizedErrorMessage;
        }

        [Authorize]
        [HttpPost]
        public IHttpActionResult Search(SearchRequest request)
        {
            try
            {
                string userId = User.Identity.GetUserId();

                var l = this._accountService.SearchUserProfile(request);

                return Ok(l);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPost]
        public IHttpActionResult GetUserProfile(string userId)
        {
            try
            {
                var profile = this._profileService.GetUserProfile(userId);
                return Ok(profile);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPost]
        public IHttpActionResult ChangeUserPhoto(UserPhoto userPhoto)
        {
            try
            {
                this._profileService.ChangeUserAvatarPhoto(userPhoto.UserId, userPhoto);
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<IHttpActionResult> UpdateUserProfile(ProfileModel model)
        {
            try
            {
                this._profileService.UpdateUserProfile(model);

                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        //[Authorize]
        [HttpPost]
        [AllowAnonymous]
        public async Task<IHttpActionResult> UpdateUserRoleGroups(KiddyShop.Models.ViewModel.ListRoleGroupsViewModel model)
        {
            try
            {
                this._profileService.UpdateUserRoleGroups(model.RoleGroups, model.IdUser);

                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Authorize]
        public async Task<IHttpActionResult> GetRoleGroupByIdUser(string id)
        {
            try
            {
                var appUser = await UserManager.FindByIdAsync(id);
                if (appUser == null)
                {
                    ModelState.AddModelError("", String.Format("Id [{0}] does not exist.", id));
                    return BadRequest(ModelState);
                }
                var l = this._profileService.GetRoleGroupMergeUserGroupByIdUser(id);
                return Ok(l);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        #endregion APIs
    }
}
