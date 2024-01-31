package com.springendmodule.formation.servies;


import com.springendmodule.formation.dtos.UserDto;
import com.springendmodule.formation.dtos.UserInfoDetails;
import com.springendmodule.formation.entities.User;
import com.springendmodule.formation.mappers.UserMapper;
import com.springendmodule.formation.repositories.FormationRepository;
import com.springendmodule.formation.repositories.UserRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService implements UserDetailsService {
	
	@Autowired
	FormationRepository formationRepository;
	
    @Autowired
    UserRepository repository;
    
    @Autowired PasswordEncoder encoder;
    
    @Autowired UserMapper userMapper;
    
    @Autowired
    EmailService emailService ;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userDetail = repository.findByName(username);
        // Converting userDetail to UserDetails
        return userDetail.map(UserInfoDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + username));
    }
    public User getUserByName(String username){
        return repository.findByName(username).get();
    }
    public User addUser(User userInfo) {
    	if(!userInfo.getRoles().equals("EXTERNE_FORMATEUR_ROLE")) {
    		userInfo.setPassword(encoder.encode(userInfo.getPassword()));
    	}else {
    		userInfo.setPassword(null);
    	}
        User user = repository.save(userInfo);
        return user;
    }
    public void deleteUser(Integer id){
    	
    	User user = repository.findById(id).get();
    	 // Update the associations and save formations
        user.getFormations().forEach(formation -> {
            formation.setUser(null); // Clear the association
            formationRepository.save(formation); // Update the formation record
        });
        // Clear the formations list from the user entity
        user.getFormations().clear();
        this.repository.deleteById(id);
    }
    public User getUserById(Integer id){
        return repository.findById(id).get();
    }
    public void updateUser(User newUser){
        if(newUser.getPassword()!=null){
            newUser.setPassword(encoder.encode(newUser.getPassword()));
        }
        repository.save(newUser);
    }
    
    public User updateUserByRole(Integer id,String role){
        User user=repository.findById(id).get();
        
        String randomPassword = UUID.randomUUID().toString().replace("-", "").substring(0, 10);
        user.setPassword(encoder.encode(randomPassword));
        
		if (user != null) {
	        String body = "Hello Mr."+user.getName()+",\n"+
        		"\n" +
                "We trust this email finds you in good health.\n" +
                "\n" +
                "We are thrilled to inform you that you are now one of our trainers, and your account on our platform is ready. Please find below your login information:\n" +
                "\n" +
                "Username: "+user.getName()+"\n" +
                "Password: "+randomPassword+"\n\n" +
                "Best regards,\n" +
                "\n" +
                "Mohamed EL KHAYAT\n" +
                "ADMINISTRATION DEPARTEMENT\n" +
                " My Center \n" +
                "\n" +
                "Note: This is an automated email. Please don't reply to it." ;
        emailService.sendSimpleEmail(user.getEmail(),"Congratulation Now your are a trainer in our Center",body);
        
        	user.setRoles(role);
        	return repository.save(user);
        }
		
        return null;
    }
    
    public List<User> getAllUsers(){
        return repository.findAll();
    }
    
    public List<UserDto> getAllFormateurs(String roles){
    	List<User> users= repository.findByRoles(roles);
    	List<UserDto> userDtos=users.stream().map(usr->userMapper.fromUser(usr))
    			.collect(Collectors.toList());
    	return userDtos;
    }
}
