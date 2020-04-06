This Project Was Completed For Tidsbanken AS

Live version: https://caseexperis.herokuapp.com/

Test User Member and User Admin will be given on request.

Trello with changelog and more documentation : https://trello.com/b/GpM8Lm01/case-experis

API live version: https://case-experis-api.herokuapp.com/api

API documentation:

Auth Controller:

/auth/register POST. To register user.

        public string Fornavn { get; set; }
        public string Etternavn { get; set; }
        public string TelefonNummer { get; set; }
        public string Email { get; set; }
        public int AntallFerieTatt { get; set; }
        public int AntallFerieIgjen { get; set; }
        public string LanguageCode { get; set; }
        public string Password { get; set; }
        
        All these fields should be included in request body.
        
/auth/login POST. To login to user.
        
        public string Email { get; set; }
        public string Password { get; set; }
        
        All these fields should be included in request body.
        
Embargo Controller:

/embargo POST restricted to admin. To create new embargo. Bearer token required with admin role.

        public DateTime Date { get; set; }
        
        All these fields should be included in request body.
        
/embargo GET. To get all embargoes.

        public int PageNumber { get; set; }
        public int PageSize
        public string Date { get; set; }    
        
        All these fields are optional to include in query string.
        
/embargo/{id} GET. To get a specific embargo.

/embargo/{id} PUT. To edit a specific embargo. restricted to admin. To create new embargo. Bearer token required with admin role.

        public DateTime Date { get; set; }
        
        All these fields should be included in request body.
        
/embargo/{id} DELETE. To delete a specific embargo. restricted to admin. To create new embargo. Bearer token required with admin role.

Ferie Controller:

/ferier/new/{id of user} POST. To create a new vacation request. restricted to members. To create new embargo. Bearer token required.

        public DateTime Date { get; set; } = new DateTime();
        public string AnsattNotat { get; set; } = "test";
        public string AdminNotat { get; set; } = "test";
        
        All these fields should be included in request body.
        
/ferier GET. To get all vacations.

        public int PageNumber { get; set; }
        public int PageSize
        public string Date { get; set; }    
        
        All these fields are optional to include in query string.
        
/ferier/user/{user id} GET. To get a users vacations.

        public int PageNumber { get; set; }
        public int PageSize
        public string Date { get; set; }    
        
        All these fields are optional to include in query string.
        
/ferier/{vacation id} GET. To get a specific vacation.

/ferier/{vacation id} PUT. To edit a specific vacation. Restricted to member who owns the vacation or an admin. Bearer token with the same id as user who created or role of admin required.

        public DateTime Date { get; set; }
        public bool isGodkjent { get; set; }
        public string AnsattNotat { get; set; }
        public string AdminNotat { get; set; }
        
        All these fields should be included in request body.
        
/ferier/{vacation id} DELETE. To delete a specific vacation. Restricted to member who owns the vacation or an admin. Bearer token with the same id as user who created or role of admin required.

/ferier/{vacation id} PATCH. To make a specific vacation request an accepted vacation. Restricted to admin. To create new embargo. Bearer token required with admin role.

User Controller:

/users GET to get all users.

/users/{user id} GET. To get a specific user.

/users/{user email} PUT. To edit a specific user. Restricted to member who owns the vacation or an admin. Bearer token with the same id as user who created or role of admin required.

        public string Fornavn { get; set; }
        public string Etternavn { get; set; }
        public string TelefonNummer { get; set; }
        public string Email { get; set; }
        public int AntallFerieTatt { get; set; }
        public int AntallFerieIgjen { get; set; }
        public string LanguageCode { get; set; }
        public string Password { get; set; }
        
        All these fields should be included in request body.
        
/users/{user email} DELETE. To delete a specific user. Restricted to admin. To create new embargo. Bearer token required with admin role.

/users/{user email} PATCH. To make a specific user an admin. Restricted to admin. To create new embargo. Bearer token required with admin role.
