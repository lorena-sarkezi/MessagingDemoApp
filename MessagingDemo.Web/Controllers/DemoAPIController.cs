using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MessagingDemo.Data;
using MessagingDemo.Data.Models;
using MessagingDemo.Web.Models;
using MessagingDemo.Data.Models;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Text;
using Serilog;

namespace MessagingDemo.Web.Controllers
{
    [Route("api/demo")]
    [ApiController]
    public class DemoAPIController : ControllerBase
    {
        private readonly DemoDbContext demoDbContext;

        public DemoAPIController(DemoDbContext demoDbContext)
        {
            this.demoDbContext = demoDbContext;
        }

        [HttpPost("customer")]
        public async Task<CustomerModel> SubmitCustomer([FromBody] CustomerModel model)
        {
            Customer customer = new Customer
            {
                Id = 0,
                FullName = model.FullName,
                PhoneNumber = model.PhoneNumber
            };

            Log.Information($"Novi primatelj. Ime: {model.FullName}; Telefon: {model.PhoneNumber}");


            demoDbContext.Add<Customer>(customer);
            await demoDbContext.SaveChangesAsync();

            return customer.GetViewModel();
        }

        [HttpGet("customers")]
        public async Task<IEnumerable<CustomerModel>> GetCustomers()
        {
            List<Customer> customers = await demoDbContext.Customers.ToListAsync();

            return customers.Select(x => x.GetViewModel());
        }

        [HttpPost("message")]
        public async Task<IActionResult> SubmitMessage([FromBody] MessageModel model)
        {
            if (model.Message.Length > 160 || model.Customers.Count == 0)
            {
                if (model.Message.Length > 160) Log.Information($"Predugacka poruka poslana");
                return BadRequest();
            }

            Log.Information($"Nova poruka poslana");

            //Dohvati cutomere koji su u popisu id-eva u requestu
            List<Customer> customers = await demoDbContext.Customers
                                                          .Where(x => model.Customers.Contains(x.Id))
                                                          .ToListAsync();

            //Dohvati postojece poruke za customere iz requesta
            List<Message> messagesExisting = await demoDbContext.Messages
                                                        .Where(x => customers.Select(x => x.Id).Contains(x.CustomerId))
                                                        .ToListAsync();

            List<Message> messagesNew = new List<Message>();



            string path = Directory.GetCurrentDirectory();
            path += "\\sms";

            Directory.CreateDirectory(path);

            byte[] fileContent = Encoding.UTF8.GetBytes(model.Message);

            FileStream fileStream = null;

            foreach (Customer customer in customers)
            {
                string fileName = $"demo_{customer.PhoneNumber}.txt";
                string fullFilePath = $"{path}\\{fileName}";

                System.IO.File.WriteAllText(fullFilePath, model.Message);

                bool msgExists = false;

                //Cudno, ali OK...
                foreach (Message message in messagesExisting)
                {
                    if (message.FileName == fileName)
                    {
                        message.DateTimeSent = DateTime.Now;
                        msgExists = true;
                    }
                }

                if (msgExists == false)
                {
                    Message messageTemp = new Message
                    {
                        CustomerId = customer.Id,
                        DateTimeSent = DateTime.Now,
                        FileName = fileName
                    };

                    messagesNew.Add(messageTemp);
                }
            }

            demoDbContext.AddRange(messagesNew);
            demoDbContext.UpdateRange(messagesExisting);

            await demoDbContext.SaveChangesAsync();

            return Ok();
        }
    }
}