using System.ComponentModel.DataAnnotations;


namespace RapidGuestRegistration.Ui.Data
{
    public class ClientUser
    {

        public string Name { get; set; }

        public string Email { get; set; }

        [Key]
        public int Id { get; set; }

        public string Password { get; set; }
    }

}
