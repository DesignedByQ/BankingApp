package com.techprj.banking.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.techprj.banking.entity.LoginLog;

@Repository
public interface LoginLogRepo extends JpaRepository<LoginLog, Long>{

}
