using Microsoft.EntityFrameworkCore.Migrations;

namespace CaseExperis.Api.Migrations
{
    public partial class FixedNorwegianIssue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SpråkKode",
                table: "Users",
                newName: "LanguageCode");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LanguageCode",
                table: "Users",
                newName: "SpråkKode");
        }
    }
}
