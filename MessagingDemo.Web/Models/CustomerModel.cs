using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MessagingDemo.Data.Models;

namespace MessagingDemo.Web.Models
{
    public class CustomerModel
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
    }
    
    public static partial class ModelExtensions
    {
        public static CustomerModel GetViewModel(this Customer customer)
        {
            return new CustomerModel
            {
                Id = customer.Id,
                FullName = customer.FullName,
                PhoneNumber = customer.PhoneNumber
            };
        }


    }
}
