﻿// <auto-generated />
using System;
using CaseExperis.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CaseExperis.Api.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity("CaseExperis.Api.Models.Ferie", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AdminNotat");

                    b.Property<string>("AnsattNotat");

                    b.Property<DateTime>("Date");

                    b.Property<int>("UserId");

                    b.Property<bool>("isGodkjent");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Ferier");
                });

            modelBuilder.Entity("CaseExperis.Api.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AntallFerieIgjen");

                    b.Property<int>("AntallFerieTatt");

                    b.Property<string>("Email");

                    b.Property<string>("Etternavn");

                    b.Property<string>("Fornavn");

                    b.Property<string>("LanguageCode");

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<string>("TelefonNummer");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("CaseExperis.Api.Models.Ferie", b =>
                {
                    b.HasOne("CaseExperis.Api.Models.User", "User")
                        .WithMany("Ferier")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
