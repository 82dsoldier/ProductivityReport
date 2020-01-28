using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
//TODO:  Move connection string to settings file rather than being hard-coded
//TODO:  Set up service account under which web site will run to replace user/pass is connection string
//TODO:  Move interfaces and bases to common library so that this data library can be uncoupled
namespace ProductivityReport.Data
{
    public static class Startup
    {
        public static void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ProductivityReportContext>(options =>
            {
                options.UseSqlServer(@"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=chat;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            });
            services.AddTransient<IConversationService, ConversationService>();
            services.AddTransient<IMessageService, MessageService>();
            services.AddTransient<IOperatorService, OperatorService>();
            services.AddTransient<IVisitorService, VisitorService>();
        }
    }
}
