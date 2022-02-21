package ru.avalon.front.feign;

import org.springframework.cloud.openfeign.FeignClient;
import ru.avalon.front.lib.client.ICategoryClient;

@FeignClient(value = "gateway", url = "${gateway.ribbon.listOfServers}")
public interface CategoryClient extends ICategoryClient {
}
