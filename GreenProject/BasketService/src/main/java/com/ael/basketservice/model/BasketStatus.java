package com.ael.basketservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name="BasketStatuses")
public class BasketStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long basketStatusId;

    private String basketStatusName;


}
