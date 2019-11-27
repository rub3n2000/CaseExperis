namespace CaseExperis.Api.Dtos
{
    public class UserForProfileDto
    {
        public string Fornavn { get; set; }
        public string Etternavn { get; set; }
        public string TelefonNummer { get; set; }
        public string Email { get; set; }
        public int AntallFerieTatt { get; set; }
        public int AntallFerieIgjen { get; set; }
        public string SpråkKode { get; set; }
    }
}