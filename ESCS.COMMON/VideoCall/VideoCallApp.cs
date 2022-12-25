using ESCS.COMMON.Common;
using ESCS.COMMON.ExtensionMethods;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ESCS.COMMON.VideoCall
{
    public interface IVideoCallApp
    {
        void SetHeader(string typ = "JWT", string alg = "HS256", string cty = "stringee-api;v=1");
        void SetPayloadJson(long? exp, string userId);
        string GetSignatureVerify();
        string GetSignatureVerify(string userId, long? exp);
    }
    public class VideoCallApp : IVideoCallApp
    {
        private string header { get; set; }
        private string payload { get; set; }
        public void SetHeader(string typ = "JWT", string alg = "HS256", string cty = "stringee-api;v=1")
        {
            if (string.IsNullOrEmpty(typ) || string.IsNullOrEmpty(alg) || string.IsNullOrEmpty(cty))
            {
                throw new Exception("Thiếu thông tin header Video Call");
            }
            this.header = @"{}".AddPropertyStringJson("typ", typ)
                                         .AddPropertyStringJson("alg", alg)
                                         .AddPropertyStringJson("cty", cty);
        }
        public void SetPayloadJson(long? exp, string userId)
        {
            if (exp == null || exp.Value <= 0 || string.IsNullOrEmpty(userId))
            {
                throw new Exception("Thiếu hoặc sai thông tin payload Video Call");
            }
            this.payload = @"{}".AddPropertyStringJson("jti", VideoCallAppConfiguration.SID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssffff"))
                                         .AddPropertyStringJson("iss", VideoCallAppConfiguration.SID)
                                         .AddPropertyStringJson("exp", exp)
                                         .AddPropertyStringJson("userId", userId);
        }
        public string GetSignatureVerify()
        {
            SetHeader();
            if (string.IsNullOrEmpty(header))
            {
                throw new Exception("Chưa gán thông tin header Video Call");
            }
            if (string.IsNullOrEmpty(payload))
            {
                throw new Exception("Chưa gán thông tin payload Video Call");
            }
            if (string.IsNullOrEmpty(VideoCallAppConfiguration.Secret))
            {
                throw new Exception("Chưa nhập apiKeySecret Video Call");
            }
            string str = Utilities.Base64UrlEncode(header) + "." + Utilities.Base64UrlEncode(payload);
            return Utilities.HMACSHA256(str, VideoCallAppConfiguration.Secret);
        }
        public string GetSignatureVerify(string userId, long? exp)
        {
            SetHeader();
            SetPayloadJson(exp, userId);
            if (string.IsNullOrEmpty(header))
            {
                throw new Exception("Chưa gán thông tin header Video Call");
            }
            if (string.IsNullOrEmpty(payload))
            {
                throw new Exception("Chưa gán thông tin payload Video Call");
            }
            if (string.IsNullOrEmpty(VideoCallAppConfiguration.Secret))
            {
                throw new Exception("Chưa nhập apiKeySecret Video Call");
            }
            string str = Utilities.Base64UrlEncode(header) + "." + Utilities.Base64UrlEncode(payload);
            return str+"."+Utilities.HMACSHA256(str, VideoCallAppConfiguration.Secret);
        }
    }
}
