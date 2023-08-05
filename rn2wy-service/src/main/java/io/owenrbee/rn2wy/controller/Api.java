package io.owenrbee.rn2wy.controller;

import java.util.Date;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import io.owenrbee.rn2wy.model.SmsMessage;
import io.owenrbee.rn2wy.service.QueueService;
import io.swagger.v3.oas.annotations.Operation;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class Api {

    @Autowired
    private QueueService queueService;

    @Operation(summary = "Queue SMS message for sending")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SmsMessage queue(@Valid @RequestBody SmsMessage sms) {

        Set<SmsMessage> set = queueService.getQueue();

        sms.setId(new Date().getTime());

        queueService.enQueue(set, sms);

        return sms;
    }

    @Operation(summary = "Delete an SMS message from the queue")
    @DeleteMapping
    public void delete(@Valid @RequestBody SmsMessage input) {

        Set<SmsMessage> set = queueService.getQueue();

        if (!set.contains(input)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        queueService.deQueue(set, input);
    }

    @Operation(summary = "Get all SMS messages")
    @GetMapping
    public Set<SmsMessage> list() {
        return queueService.getQueue();
    }

}
