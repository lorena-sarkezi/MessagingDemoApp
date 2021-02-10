using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MessagingDemo.Data.Models
{
    [Table("messages", Schema ="ap_demo")]
    public class Message
    {
        [Required, Key, Column("message_id"), DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MessageId { get; set; }

        [Required, Column("customer_id"), ForeignKey("Customer")]
        public int CustomerId { get; set; }

        [Required, Column("file_name")]
        public string FileName { get; set; }

        [Required, Column("datetime_sent")]
        public DateTime DateTimeSent { get; set; }

        public virtual Customer Customer { get; set; }
    }
}
