package com.techprj.banking.entity;

import java.sql.Time;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="authentication")
public class AuthUser {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id_Auth_User")
	private Integer idAuthUser;
	private String username;
	private String password;
	private Boolean isSuperuser;
	private Boolean isStaff;
	private Long twoFACode;
	private Time twoFACodeExpiryTime;	
	@OneToOne(mappedBy = "authUser")
	private UserProfile userProfile;
	
	public AuthUser() {
		super();
	}

	public AuthUser(Integer idAuthUser, String username, String password, Boolean isSuperuser, Boolean isStaff,
			Long twoFACode, Time twoFACodeExpiryTime, UserProfile userProfile) {
		super();
		this.idAuthUser = idAuthUser;
		this.username = username;
		this.password = password;
		this.isSuperuser = isSuperuser;
		this.isStaff = isStaff;
		this.twoFACode = twoFACode;
		this.twoFACodeExpiryTime = twoFACodeExpiryTime;
		this.userProfile = userProfile;
	}

	public Integer getIdAuthUser() {
		return idAuthUser;
	}

	public void setIdAuthUser(Integer idAuthUser) {
		this.idAuthUser = idAuthUser;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Boolean getIsSuperuser() {
		return isSuperuser;
	}

	public void setIsSuperuser(Boolean isSuperuser) {
		this.isSuperuser = isSuperuser;
	}

	public Boolean getIsStaff() {
		return isStaff;
	}

	public void setIsStaff(Boolean isStaff) {
		this.isStaff = isStaff;
	}

	public Long getTwoFACode() {
		return twoFACode;
	}

	public void setTwoFACode(Long twoFACode) {
		this.twoFACode = twoFACode;
	}

	public Time getTwoFACodeExpiryTime() {
		return twoFACodeExpiryTime;
	}

	public void setTwoFACodeExpiryTime(Time twoFACodeExpiryTime) {
		this.twoFACodeExpiryTime = twoFACodeExpiryTime;
	}

	public UserProfile getUserProfile() {
		return userProfile;
	}

	public void setUserProfile(UserProfile userProfile) {
		this.userProfile = userProfile;
	}

	@Override
	public String toString() {
		return "AuthUser [idAuthUser=" + idAuthUser + ", username=" + username + ", password=" + password
				+ ", isSuperuser=" + isSuperuser + ", isStaff=" + isStaff + ", twoFACode=" + twoFACode
				+ ", twoFACodeExpiryTime=" + twoFACodeExpiryTime + ", userProfile=" + userProfile + "]";
	}
		
}
