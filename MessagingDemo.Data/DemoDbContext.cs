using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using MessagingDemo.Data.Models;

namespace MessagingDemo.Data
{
    public class DemoDbContext: DbContext
    {
        public DemoDbContext(DbContextOptions<DemoDbContext> options): base(options)
        {

        }
        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<Message> Messages { get; set; }
    }
}
