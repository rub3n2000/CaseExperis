using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CaseExperis.Api.Migrations
{
    public partial class AddedFerier : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Ferier",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Date = table.Column<DateTime>(nullable: false),
                    isGodkjent = table.Column<bool>(nullable: false),
                    AnsattNotat = table.Column<string>(nullable: true),
                    AdminNotat = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ferier", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ferier");
        }
    }
}
