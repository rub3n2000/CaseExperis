using System.Linq;
using AutoMapper;
using CaseExperis.Api.Dtos;
using CaseExperis.Api.Models;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User,UserForProfileDto>();
            CreateMap<UserForUpdateDto,User>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<Ferie, FerieForUpdate>();
            CreateMap<FerieToCreate,Ferie>();
            CreateMap<Ferie, Ferie>();
            CreateMap<FerieForUpdate, Ferie>();
            CreateMap<Ferie, FerieToReturn>().ForMember(dest => dest.Navn, opt => opt.MapFrom(src => src.User.Fornavn + " " + src.User.Etternavn));
            CreateMap<FerieToReturn,Ferie>();
        }
    }
}