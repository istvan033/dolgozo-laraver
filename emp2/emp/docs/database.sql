create database si2n_emp
character set utf8 
COLLATE utf8_hungarian_ci;


grant ALL privileges
on si2n_emp. *
to si2n_emp@localhost
identified by 'titok';