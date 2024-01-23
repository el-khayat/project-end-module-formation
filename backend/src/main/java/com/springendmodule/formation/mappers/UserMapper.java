package com.springendmodule.formation.mappers;


import com.springendmodule.formation.dtos.FormationDTO;
import com.springendmodule.formation.dtos.UserCreateDTO;
import com.springendmodule.formation.dtos.UserDto;
import com.springendmodule.formation.entities.Formation;
import com.springendmodule.formation.entities.User;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class UserMapper {
    public User fromUserDTO(UserDto userDto) {

        User user  =new User();
        BeanUtils.copyProperties(userDto, user);
        return user;
    }

    public UserDto fromUser(User user) {

        UserDto userDto =new UserDto();
        BeanUtils.copyProperties(user, userDto);
        return userDto;
    }
    
    public User fromUserCreateDtoToUser(UserCreateDTO createDTO) {
    	User user=new User();
    	BeanUtils.copyProperties(createDTO, user);
    	return user;
    }
}
