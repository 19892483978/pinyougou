package com.pinyougou.user.service;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.ArrayList;
import java.util.List;

public class UserDetailServiceImpl implements UserDetailsService {
    //认证工作不需要我们本地去做,是由cs服务端来做
    @Override
    public UserDetails loadUserByUsername(String username) {
        System.out.println("经过认证类...");
        //构建角色集合
        List<GrantedAuthority> authorities=new ArrayList();
        //电商系统前台只有一个角色,电商后台需要去数据库查询角色
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        return new User(username, "" , authorities);
    }

}
