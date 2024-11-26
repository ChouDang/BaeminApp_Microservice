input {
    jdbc {
        jdbc_driver_library => "/usr/share/logstash/driver/postgresql-42.2.19.jar"
        jdbc_driver_class => "org.postgresql.Driver"
        jdbc_connection_string => "jdbc:postgresql://some-postgres:5432/db_baemin"
        jdbc_user => "postgres"
        jdbc_password => "1234"
        statement => "SELECT * FROM restaurants"
        schedule => "* * * * *" 
        tags => ["restaurants"]
    }
    jdbc {
        jdbc_driver_library => "/usr/share/logstash/driver/postgresql-42.2.19.jar"
        jdbc_driver_class => "org.postgresql.Driver"
        jdbc_connection_string => "jdbc:postgresql://some-postgres:5432/db_baemin"
        jdbc_user => "postgres"
        jdbc_password => "1234"
        statement => "SELECT * FROM foods"
        schedule => "* * * * *" 
        tags => ["foods"]
    }
}

filter {
    if "restaurants" in [tags] {
        mutate {
            add_field => { "[@metadata][index]" => "restaurants-index" }
        }
    }
    if "foods" in [tags] {
        mutate {
            add_field => { "[@metadata][index]" => "foods-index" }
        }
    }
}

output {
    elasticsearch {
        hosts => ["https://elasticsearch:9200"]
        ssl => true
        ssl_certificate_verification => false
        user => "elastic"
        password => "123456"
        index => "%{[@metadata][index]}"
        document_id => "%{id}"
    }
    stdout { codec => rubydebug }
}
