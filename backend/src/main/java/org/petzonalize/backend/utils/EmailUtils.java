package org.petzonalize.backend.utils;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.nio.charset.StandardCharsets;

@Component
public class EmailUtils {
    private final JavaMailSender mailSender;
    private final String senderEmail = "tuprofedog@gmail.com";

    public EmailUtils(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(String to, String subject, String content) {
        try {
        	MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        	helper.setFrom(senderEmail);
            helper.setTo(to);
            helper.setSubject(subject);
	            
	         // Enable HTML content
            message.setText(content, StandardCharsets.UTF_8.toString(), "html");
                        
            mailSender.send(message);
        } catch (MessagingException e) {
            // Handle the exception appropriately
            e.printStackTrace();
        }
    }
}