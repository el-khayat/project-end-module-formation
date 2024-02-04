package com.springendmodule.formation;

import com.springendmodule.formation.entities.Category;
import com.springendmodule.formation.entities.User;
import com.springendmodule.formation.repositories.CategoryRepository;
import com.springendmodule.formation.servies.CategoryService;
import com.springendmodule.formation.servies.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin(origins = "*")
public class FormationApplication  implements CommandLineRunner {

	@Autowired
	UserService repository ;
	@Autowired
	CategoryRepository categoryRepository;
	public static void main(String[] args) {
		SpringApplication.run(FormationApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Hello");
		User user = new User();
		user.setId(1);
		user.setName("admin");
		user.setEmail("admin@gmail.com");
		user.setPassword("admin");
		user.setRoles("ADMIN_ROLE");  
	//	repository.addUser(user);
		Category category=new Category(Long.valueOf(1),"Devops",null);
		Category category1=new Category(Long.valueOf(2),"Dev Mobile",null);
		Category category2=new Category(Long.valueOf(3),"Data Science",null);
		Category category3=new Category(Long.valueOf(4),"IA",null);
		Category category4=new Category(Long.valueOf(5),"Dev Web",null);
		categoryRepository.save(category);
		categoryRepository.save(category1);
		categoryRepository.save(category2);
		categoryRepository.save(category3);
		categoryRepository.save(category4);

	}
}
