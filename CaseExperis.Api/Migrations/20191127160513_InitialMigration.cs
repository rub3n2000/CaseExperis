using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CaseExperis.Api.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Fornavn = table.Column<string>(nullable: true),
                    Etternavn = table.Column<string>(nullable: true),
                    TelefonNummer = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    AntallFerieTatt = table.Column<int>(nullable: false),
                    AntallFerieIgjen = table.Column<int>(nullable: false),
                    SpråkKode = table.Column<string>(nullable: true),
                    PasswordHash = table.Column<byte[]>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ferier",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Date = table.Column<DateTime>(nullable: false),
                    isGodkjent = table.Column<bool>(nullable: false),
                    AnsattNotat = table.Column<string>(nullable: true),
                    AdminNotat = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ferier", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ferier_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ferier_UserId",
                table: "Ferier",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ferier");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
