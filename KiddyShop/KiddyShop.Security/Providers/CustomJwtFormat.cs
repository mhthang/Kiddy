using KiddyShop.Security.Commons;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.DataHandler.Encoder;
using System;
using System.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Thinktecture.IdentityModel.Tokens;

namespace KiddyShop.Security.Providers
{
    public class CustomJwtFormat : ISecureDataFormat<AuthenticationTicket>
    {
        private readonly string _issuer = string.Empty;

        public CustomJwtFormat(string issuer)
        {
            _issuer = issuer;
        }

        public string Protect(AuthenticationTicket data)
        {
            if (data == null)
            {
                throw new ArgumentNullException("data");
            }

            string audienceId = Constants.CONFIGURATION_AUDIENCE_ID;

            string symmetricKeyAsBase64 = Constants.CONFIGURATION_AUDIENCE_SECRET;

            var secKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(Encoding.Default.GetBytes(symmetricKeyAsBase64));
         
            var signKey = new Microsoft.IdentityModel.Tokens.SigningCredentials(secKey, SecurityAlgorithms.HmacSha256Signature);

            //var keyByteArray = TextEncodings.Base64Url.Decode(symmetricKeyAsBase64);

            //var signingKey = new HmacSigningCredentials(keyByteArray);

            var issued = data.Properties.IssuedUtc;

            var expires = data.Properties.ExpiresUtc;

            var token = new JwtSecurityToken(_issuer, audienceId, data.Identity.Claims, issued.Value.UtcDateTime, expires.Value.UtcDateTime, signKey);

            var handler = new JwtSecurityTokenHandler();

            var jwt = handler.WriteToken(token);

            return jwt;
        }

        public AuthenticationTicket Unprotect(string protectedText)
        {
            throw new NotImplementedException();
        }
    }
}