ALTER TABLE accounts_cstm MODIFY lxcode_c int AUTO_INCREMENT not null unique;
ALTER TABLE contacts_cstm MODIFY lxcode_c int AUTO_INCREMENT not null unique;
ALTER TABLE opportunities_cstm MODIFY lxcode_c int AUTO_INCREMENT not null unique;
ALTER TABLE leads_cstm MODIFY lxcode_c int AUTO_INCREMENT not null unique;
ALTER TABLE cases_cstm MODIFY lxcode_c int AUTO_INCREMENT not null unique;
ALTER TABLE lx_payments MODIFY lxcode int AUTO_INCREMENT not null unique;