using RapidGuestRegistration.Client.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;



namespace RapidGuestRegistration.Ui.Data
{
    public class GuestEditModel
    {
        
        [Required]
        [StringLength(30)]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Phone]
        public string Phonenumber { get; set; }


        public Guest ToGuest()
        {
            Guest guest = new Guest(Name, Email, Phonenumber);
            return guest;
        }
    }
}
