package com.techprj.banking.entity;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.techprj.banking.dto.AddressDTO;
import com.techprj.banking.dto.AuthUserDTO;

@Entity
@Table(name="users")
public class UserProfile {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long idUserProfile;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_Auth_User")
	private AuthUser authUser;
	private String firstName;
	private String middleName;
	private String lastName;
	@Column(unique = true)
	private Long mobile;
	@Column(unique = true)
	private String email;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_ID")
	private Address address;
	private LocalDate customerSince;
	
	public UserProfile() {
		super();
	}

	public UserProfile(Long idUserProfile, AuthUser authUser, String firstName, String middleName, String lastName,
			Long mobile, String email, Address address, LocalDate customerSince) {
		super();
		this.idUserProfile = idUserProfile;
		this.authUser = authUser;
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.mobile = mobile;
		this.email = email;
		this.address = address;
		this.customerSince = customerSince;
	}

	public Long getIdUserProfile() {
		return idUserProfile;
	}

	public void setIdUserProfile(Long idUserProfile) {
		this.idUserProfile = idUserProfile;
	}

	public AuthUser getAuthUser() {
		return authUser;
	}

	public void setAuthUser(AuthUser authUser) {
		this.authUser = authUser;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Long getMobile() {
		return mobile;
	}

	public void setMobile(Long mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public LocalDate getCustomerSince() {
		return customerSince;
	}

	public void setCustomerSince(LocalDate customerSince) {
		this.customerSince = customerSince;
	}

	@Override
	public String toString() {
		return "UserProfile [idUserProfile=" + idUserProfile + ", authUser=" + authUser + ", firstName=" + firstName
				+ ", middleName=" + middleName + ", lastName=" + lastName + ", mobile=" + mobile + ", email=" + email
				+ ", address=" + address + ", customerSince=" + customerSince + "]";
	}

}
