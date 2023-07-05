package com.techprj.banking.api;


 import java.util.List;
import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.techprj.banking.dto.LoginLogDTO;
import com.techprj.banking.dto.UserProfileDTO;
import com.techprj.banking.service.AccExistsService;
import com.techprj.banking.service.DAOService;
import com.techprj.banking.service.EmailServiceDAOImpl;
import com.techprj.banking.service.INTServiceDAOImpl;
import com.techprj.banking.service.SMSServiceDAOImpl;
import com.techprj.registration.dto.RegDetailsDTO;
import com.techprj.registration.entity.RegDetails;

@RestController
@RequestMapping("/api")
@Validated
@CrossOrigin(origins = "http://localhost:3000")
public class ControllerAPI {

	@Autowired
	EmailServiceDAOImpl emailServiceDAOImpl;
	
	@Autowired
	DAOService daoService;
	
	@Autowired
	SMSServiceDAOImpl smsServiceDAOImpl;
	
	@Autowired
	INTServiceDAOImpl intServiceDAOImpl;
	
	@Autowired
	AccExistsService accExistsService;
	
	@Autowired
	RestTemplate restTemplate;
	
	@PostMapping(value="/adduser", consumes = {MediaType.ALL_VALUE})
	public ResponseEntity<UserProfileDTO> addUser(@RequestBody UserProfileDTO userProfileDTO) throws AddressException, MessagingException {
		
		//send email to cust and delete oject from registration DB
		//emailServiceDAOImpl.sendApproval(userProfileDTO);
		//need to go in reg MS and set it as approved  by email using patch method
		
		
		//RegDetailsDTO rddto = restTemplate.patchForObject("http://Registration/api/updateapplication" + userProfileDTO.getEmail(), RegDetailsDTO.class, RegDetailsDTO.class);
		
		
		return ResponseEntity.status(HttpStatus.CREATED).body(intServiceDAOImpl.addUser(userProfileDTO));
				
	}
	
	@PostMapping(value="/email/{email}", consumes = {MediaType.ALL_VALUE}, produces = {"application/json", "application/xml"})
	public ResponseEntity<Boolean> sendApproval(@PathVariable("email") String email, @RequestBody RegDetails regDetails) throws AddressException, MessagingException {
		return ResponseEntity.status(HttpStatus.OK).body(emailServiceDAOImpl.sendVerdict(email, regDetails));
	}
	
	@GetMapping(value="/getprofile/{emailid}", consumes = {MediaType.ALL_VALUE}, produces = {"application/json", "application/xml"})
	public ResponseEntity<UserProfileDTO> getProfile(@PathVariable("emailid") String emailid) {
		return ResponseEntity.status(HttpStatus.OK).body(intServiceDAOImpl.getProfile(emailid));
	}
	
	@GetMapping(value="/getlog/{emailid}", consumes = {MediaType.ALL_VALUE}, produces = {"application/json", "application/xml"})
	public ResponseEntity<List<LoginLogDTO>> getLog(@PathVariable("emailid") String emailid) {
		return ResponseEntity.status(HttpStatus.OK).body(intServiceDAOImpl.getLog(emailid));
	}
	
	@PutMapping(value="/emails/{emailid}/password/{password}/2fa", consumes={MediaType.ALL_VALUE})
	public ResponseEntity<Object> send2faCodeinEmail(@PathVariable("emailid") String emailid, @PathVariable("password") String password) throws AddressException, MessagingException {
		
		//validate the account exists
		//amend this to return a integer 0 = dont exist 1 = cust 2 = staff
		boolean accExists = accExistsService.checkCredentials(emailid, password);
		
		//System.out.println(accExists);
		
		if(accExists) {
			String twoFaCode = String.valueOf(new Random().nextInt(9999)+1000);
			emailServiceDAOImpl.sendEmail(emailid, twoFaCode);
			daoService.update2FAProperties(emailid, twoFaCode);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		
		return new ResponseEntity<>(HttpStatus.FORBIDDEN);
		
	}
	
	@PutMapping(value="/users/{userid}/mobilenumbers/{mobilenumber}/2fa", consumes={MediaType.ALL_VALUE})
	public ResponseEntity<Object> send2faCodeinSMS(@PathVariable("userid") String userid, @PathVariable("mobilenumber") String mobilenumber){
		
		String twoFaCode = String.valueOf(new Random().nextInt(9999)+1000);
		smsServiceDAOImpl.send2FaCode(mobilenumber, twoFaCode);
		daoService.update2FAProperties(userid, twoFaCode);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PutMapping(value="/emails/{emailid}/codes/{twofacode}", consumes={MediaType.ALL_VALUE})
	public ResponseEntity<Object> verify(@PathVariable("emailid") String emailid, @PathVariable("twofacode") String code){
		
		boolean isValid = daoService.checkCode(emailid, code);
		
		if(isValid) {
			//create function that makes entry into log table
			intServiceDAOImpl.createLog(emailid);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		
		return new ResponseEntity<>(HttpStatus.FORBIDDEN);	
		
	}
	
}
