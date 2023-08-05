package io.owenrbee.rn2wy.service;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import io.owenrbee.rn2wy.model.SmsMessage;

@Service
@CacheConfig(cacheNames = { "queue" })
public class QueueService {

    private static final String KEY = "'list'";

    @CachePut(key = KEY)
    public Set<SmsMessage> enQueue(Set<SmsMessage> set, SmsMessage sms) {

        Set<SmsMessage> newSet = new HashSet<>(set);
        newSet.add(sms);
        return newSet;
    }

    @CachePut(key = KEY)
    public Set<SmsMessage> deQueue(Set<SmsMessage> set, SmsMessage sms) {
        Set<SmsMessage> newSet = new HashSet<>(set);
        newSet.remove(sms);
        return newSet;
    }

    @Cacheable(key = KEY)
    public Set<SmsMessage> getQueue() {
        return Collections.emptySet();
    }

}
