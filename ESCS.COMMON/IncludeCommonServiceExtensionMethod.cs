using ESCS.COMMON.Caches;
using ESCS.COMMON.Caches.interfaces;
using ESCS.COMMON.MongoDb;
using ESCS.COMMON.VideoCall;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace ESCS.COMMON
{
    public static class IncludeCommonServiceExtensionMethod
    {
        public static void AddCommonService(this IServiceCollection services)
        {
            services.AddScoped<IMongoDBContext, MongoDBContext>();
            services.AddScoped(typeof(ILogRequestRepository<>), typeof(LogRequestRepository<>));
            services.AddScoped(typeof(ILogRequestService<>), typeof(LogRequestService<>));
            services.AddScoped<ICacheServer, CacheServer>();
            services.AddScoped<IMemoryCacheManager, MemoryCacheManager>();
            services.AddSingleton<IVideoCallApp, VideoCallApp>();
        }
    }
}
