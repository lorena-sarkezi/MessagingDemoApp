using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MessagingDemo.Data.Models
{
   [Table("customers", Schema ="ap_demo")]
    public class Customer
    {
        [Required, Key, Column("customer_id"), DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required, Column("full_name")]
        public string FullName { get; set; }

        [Required, Column("phone_number")]
        public string PhoneNumber { get; set; }

        //public virtual IEnumerable<Message> Messages 
    }
}
