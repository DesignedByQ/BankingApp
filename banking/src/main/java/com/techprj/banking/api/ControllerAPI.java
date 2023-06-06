package com.techprj.banking.api;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Validated
public class ControllerAPI {

	//@Autowired
	
	@PutMapping(value="/users/{userid}/emails/{emailid}/2fa", consumes={MediaType.ALL_VALUE})
	public ResponseEntity<Object> send2faCodeinEmail(@PathVariable("userid") String userid, @PathVariable("emailid") String emailid) {
		
		
		return null;
	}
	
	@PutMapping(value="/users/{userid}/mobilenumbers/{mobilenumber}/2fa", consumes={MediaType.ALL_VALUE})
	public ResponseEntity<Object> send2faCodeinSMS(@PathVariable("userid") String userid, @PathVariable("mobilenumber") String mobilenumber){
		
		
		return null;
	}
	
}
