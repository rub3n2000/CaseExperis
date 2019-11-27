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
        }
    }
}