﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CaseExperis.Api.Migrations
{
    public partial class Initial : Migration
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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
