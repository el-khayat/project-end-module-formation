package com.springendmodule.formation.servies;


import com.springendmodule.formation.dtos.UserInfoDetails;
import com.springendmodule.formation.entities.User;
import com.springendmodule.formation.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    UserRepository repository;
    @Autowired PasswordEncoder encoder;
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
        userInfo.setPassword(encoder.encode(userInfo.getPassword()));
        User user = repository.save(userInfo);
        return user;
    }
    public void deleteUser(Integer id){
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
    public List<User> getAllUsers(){
        return repository.findAll();
    }
}
