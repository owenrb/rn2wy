package io.owenrbee.rn2wy.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode
public class SmsMessage {

    private long id;

    @NotBlank
    @Size(min = 11, max = 11, message = "Please enter 11 digit mobile number")
    @Pattern(regexp = "^0.*$", message = "Mobile number must starts with 0")
    @Pattern(regexp = "[0-9]+", message = "Mobile number must contain numbers only")
    @Schema(example = "09203334444")
    private String to;

    @NotBlank
    private String message;

}
