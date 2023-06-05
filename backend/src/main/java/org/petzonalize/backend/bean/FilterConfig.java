package org.petzonalize.backend.bean;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.CharacterEncodingFilter;

@Configuration
public class FilterConfig {

	@Bean
    FilterRegistrationBean<?> characterEncodingFilterRegistrationBean() {
        FilterRegistrationBean<?> registrationBean = new FilterRegistrationBean<>(characterEncodingFilter());
        registrationBean.addUrlPatterns("/*");
        return registrationBean;
    }
	
	@Bean
    CharacterEncodingFilter characterEncodingFilter() {
        CharacterEncodingFilter filter = new CharacterEncodingFilter();
        filter.setEncoding("UTF-8");
        filter.setForceEncoding(true);
        return filter;
    }
}

