-- CORRECTED Complete CSV Import for Construction Stock Manager
-- FIXED: "Ferramenta" items are now tracked inventory (not assets)
-- Generated from Estoque Modelo - Estoque.csv with separate unit/category columns
-- Total items: 205

-- Note: Run fixed-schema.sql first to create the proper table structure

-- TRACKED INVENTORY ITEMS (138 items)
-- These items have minimum stock levels and trigger auto-POs
-- Now includes all "Ferramenta" items since they have quantities!
INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Placa ST Acartonado', NULL, 'Placa', 'Gesso', 'tracked', 10, 3, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Placa RU Acartonado', NULL, 'Placa', 'Gesso', 'tracked', 0, 3, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Placa Convencional', NULL, 'Placa', 'Gesso', 'tracked', 0, 3, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Pó de Gesso (5kg)', NULL, 'Saco', 'Gesso', 'tracked', 0, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Fita Papel Drywall', NULL, 'Rolo', 'Gesso', 'tracked', 2, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Fita Telada Drywall', NULL, 'Rolo', 'Gesso', 'tracked', 4, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Perfil Montante', NULL, 'Barra', 'Gesso', 'tracked', 3, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Perfil Guia', NULL, 'Barra', 'Gesso', 'tracked', 0, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Gesso Cola (5Kg)', NULL, 'Saco', 'Gesso', 'tracked', 1, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Massa para Drywall (20Kg)', NULL, 'Balde', 'Gesso', 'tracked', 1, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Graute (25Kg)', NULL, 'Saco', 'Concreto', 'tracked', 2, 5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Autonivelante (20Kg)', NULL, 'Saco', 'Concreto', 'tracked', 4, 5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Cimento CP32 (50Kg)', NULL, 'Saco', 'Concreto', 'tracked', 0, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Argamassa de Projeção (25Kg)', NULL, 'Saco', 'Concreto', 'tracked', 0, 5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Cimento Cola ACIII (25Kg)', NULL, 'Saco', 'Concreto', 'tracked', 0, 5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Bianco (18L)', NULL, 'Balde', 'Alvenaria', 'tracked', 1, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Tela Plástica Estuque', NULL, 'Rolo', 'Alvenaria', 'tracked', 0, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Máscara PFF', NULL, 'Unidade', 'EPI', 'tracked', 19, 5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Protetor Auricular', NULL, 'Unidade', 'EPI', 'tracked', 4, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Óculos Transparente', NULL, 'Unidade', 'EPI', 'tracked', 9, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Luva Tátil', NULL, 'Par', 'EPI', 'tracked', 2, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Luva de Solda', NULL, 'Par', 'EPI', 'tracked', 3, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Luva Látex', NULL, 'Par', 'EPI', 'tracked', 10, 5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Trava Quedas 6M', NULL, 'Unidade', 'EPI', 'tracked', 1, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Talabarte', NULL, 'Unidade', 'EPI', 'tracked', 2, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Cinto de Segurança', NULL, 'Unidade', 'EPI', 'tracked', 2, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Máscara de Solda', 'Emprestado Donovan (Elisandro)', 'Unidade', 'EPI', 'tracked', 0, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Disco de Desbaste 7', NULL, 'Unidade', 'Disco', 'tracked', 6, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Disco de Desbaste 4.1/2', NULL, 'Unidade', 'Disco', 'tracked', 3, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Disco de Desbaste 4', NULL, 'Unidade', 'Disco', 'tracked', 4, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Disco Diamantado 4.1/2', NULL, 'Unidade', 'Disco', 'tracked', 2, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Disco ferro 4.1/2', NULL, 'Unidade', 'Disco', 'tracked', 0, 5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Lixa 80 Massa', NULL, 'Pacote', 'Pintura', 'tracked', 1, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Lixa 120 Massa', NULL, 'Pacote', 'Pintura', 'tracked', 0, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Lixa 150 Massa', NULL, 'Pacote', 'Pintura', 'tracked', 0, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Lixa 180 Massa', NULL, 'Pacote', 'Pintura', 'tracked', 0, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Lixa 220 Massa', NULL, 'Pacote', 'Pintura', 'tracked', 0, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Lixa 80 Reboco', NULL, 'Rolo', 'Pintura', 'tracked', 1, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Tinta SW Névoa Passageira', NULL, 'Balde', 'Tinta', 'tracked', 1, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Tinta SW Branco Fosco', NULL, 'Balde', 'Tinta', 'tracked', 1, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Tinta SW SC-161 Prata', NULL, 'Balde', 'Tinta', 'tracked', 1, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Tinta SW Manhã Gelada', NULL, 'Balde', 'Tinta', 'tracked', 0, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Tinta Suvinil Grisalho', NULL, 'Balde', 'Tinta', 'tracked', 2, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Tinta SW Grisalho', NULL, 'Balde', 'Tinta', 'tracked', 1, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Tinta Suvinil Branco Fosco', NULL, 'Balde', 'Tinta', 'tracked', 1, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Tinta Suvinil Cromio', NULL, 'Balde', 'Tinta', 'tracked', 1, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Tinta SW Cinza Agradável Canto', NULL, 'Balde', 'Tinta', 'tracked', 3, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Tinta SW Cinza Agradável Vanguarda', NULL, 'Balde', 'Tinta', 'tracked', 1, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Massa Corrida Acrílica', NULL, 'Balde', 'Pintura', 'tracked', 2, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Massa Corrida PVA', NULL, 'Balde', 'Pintura', 'tracked', 1, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Resina SW Impermeabilizante', NULL, 'Balde', 'Pintura', 'tracked', 2, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Textura SW Efeito Rústico Branca', NULL, 'Balde', 'Pintura', 'tracked', 1, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Fundo Galvanizado Coral', NULL, 'Galão', 'Tinta', 'tracked', 2, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Fundo Preparador', NULL, 'Galão', 'Tinta', 'tracked', 0.5, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Fita Crepe', NULL, 'Rolo', 'Pintura', 'tracked', 27, 10, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Rolo Atlas de Espuma 23cm', NULL, 'Unidade', 'Pintura', 'tracked', 7, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Rolo Atlas de Espuma 15cm', NULL, 'Unidade', 'Pintura', 'tracked', 6, 5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Rolo Atlas de Espuma 9cm', NULL, 'Unidade', 'Pintura', 'tracked', 2, 5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Rolo Atlas de Textura Cabelo de Anjo 23cm', NULL, 'Unidade', 'Pintura', 'tracked', 1, 5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Rolo Atlas de Lã Antigota 23cm', NULL, 'Unidade', 'Pintura', 'tracked', 3, 5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Rolo Atlas de Lã Antigota  15cm', NULL, 'Unidade', 'Pintura', 'tracked', 1, 5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Rolo Atlas de Lã Antigota  9cm', NULL, 'Unidade', 'Pintura', 'tracked', 1, 5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Pincel Atlas 1', NULL, 'Unidade', 'Pintura', 'tracked', 0, 5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Pincel Atlas 1 1/2', NULL, 'Unidade', 'Pintura', 'tracked', 0, 5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Pincel Atlas 2', NULL, 'Unidade', 'Pintura', 'tracked', 0, 5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Tinta Spray RAL 9005 (Esquadrias Aires/Canto)', NULL, 'Tubo', 'Tinta', 'tracked', 3, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Tinta Spray RAL 7043 (Esquadrias Inn/TSG)', NULL, 'Tubo', 'Tinta', 'tracked', 0, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Tinta Spray RAL 9003 (Portas Pormade Branco)', NULL, 'Tubo', 'Tinta', 'tracked', 1, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Rejunte Branco Brilhante', NULL, 'Pacote', 'Rejunte', 'tracked', 4, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Rejunte Cinza Ártico', NULL, 'Pacote', 'Rejunte', 'tracked', 0, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Rejunte Preto', NULL, 'Pacote', 'Rejunte', 'tracked', 6, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Rejunte Corda', NULL, 'Pacote', 'Rejunte', 'tracked', 8, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Rejunte Refratário', NULL, 'Pacote', 'Rejunte', 'tracked', 4.5, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Rejunte p/ piscina', NULL, 'Pacote', 'Rejunte', 'tracked', 0.5, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Bloco de espuma', NULL, 'Unidade', 'Rejunte', 'tracked', 3, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Espátula p/ Rejunte', NULL, 'Unidade', 'Rejunte', 'tracked', 0, 5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Espaçador de piso 2mm', NULL, 'Pacote', 'Cerâmica', 'tracked', 0, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Espaçador de piso 1,5mm', NULL, 'Pacote', 'Cerâmica', 'tracked', 3, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Espaçador de piso 1mm', NULL, 'Pacote', 'Cerâmica', 'tracked', 4, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Spray VedaTudo Transparente', NULL, 'Tubo', 'Impermeabilização', 'tracked', 14, 10, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('SOS Reparo 1KG Tubolit', NULL, 'Caixa', 'Impermeabilização', 'tracked', 1, 5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Gás Maçarico', NULL, 'Tubo', 'Impermeabilização', 'tracked', 3, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Resina Bautech Transparente Fosco Fachada', NULL, 'Caixa', 'Impermeabilização', 'tracked', 1, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Manta Líquida Incolor Bautech Laje', NULL, 'Balde', 'Impermeabilização', 'tracked', 1, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Pintura Cimentícia Quartzolit', NULL, 'Pacote', 'Impermeabilização', 'tracked', 5, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Tela pintura Cimentícia', NULL, 'Rolo', 'Impermeabilização', 'tracked', 1, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Manta SikaShield', NULL, 'Rolo', 'Impermeabilização', 'tracked', 1, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Cimento Asfáltico', NULL, 'Saco', 'Impermeabilização', 'tracked', 1, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Aditivo Impermeabilizante', NULL, 'Balde', 'Impermeabilização', 'tracked', 1, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Silicone à Base D`água Branco Poliplas', NULL, 'Tubo', 'Tubular', 'tracked', 9, 12, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Espuma Expansiva para Pistola Profissional', NULL, 'Tubo', 'Tubular', 'tracked', 1, 10, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Chumbador Químico Ancora AQI380PRO', NULL, 'Tubo', 'Tubular', 'tracked', 4, 5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Suvinil Selatrinca Tubo', NULL, 'Tubo', 'Tubular', 'tracked', 4, 12, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('PU30 Quartzolit Cinza', NULL, 'Tubo', 'Tubular', 'tracked', 1, 12, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('PU30 Quartzolit Preto', NULL, 'Tubo', 'Tubular', 'tracked', 6, 12, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('PU30 Quartzolit Branco', NULL, 'Tubo', 'Tubular', 'tracked', 7, 12, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Silicone Neutro Incolor TOP490N', NULL, 'Tubo', 'Tubular', 'tracked', 3, 24, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Álcool 70° 1L', NULL, 'Unidade', 'Limpeza', 'tracked', 14, 5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Thinner 900mL', NULL, 'Lata', 'Limpeza', 'tracked', 4, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Aromatizante/Odorizador (Talco)', NULL, 'Tubo', 'Limpeza', 'tracked', 3, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Tira Cola Alchem 120mL', NULL, 'Unidade', 'Limpeza', 'tracked', 0, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Limpador de Espuma Expansiva Ancora', NULL, 'Tubo', 'Limpeza', 'tracked', 5, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Esponja Multiuso', NULL, 'Unidade', 'Limpeza', 'tracked', 27, 10, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Fibra Verde', NULL, 'Unidade', 'Limpeza', 'tracked', 3, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Fibra Branca', NULL, 'Unidade', 'Limpeza', 'tracked', 5, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Papel Higiênico', NULL, 'Rolo', 'Limpeza', 'tracked', 24, 10, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Papel Toalha', NULL, 'Rolo', 'Limpeza', 'tracked', 0, 10, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Saco de Lixo 100L (100un)', NULL, 'Pacote', 'Limpeza', 'tracked', 4, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Lona 4x100 100 Micras', NULL, 'Rolo', 'Limpeza', 'tracked', 2, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Saco Alvejado Comum', NULL, 'Unidade', 'Limpeza', 'tracked', 33, 20, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Pano Algodão', NULL, 'Unidade', 'Limpeza', 'tracked', 9, 10, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Pano Microfibra', NULL, 'Unidade', 'Limpeza', 'tracked', 3, 3, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Escova Sanitária com Suporte', NULL, 'Unidade', 'Limpeza', 'tracked', 1, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Alvejante (5L)', NULL, 'Galão', 'Limpeza', 'tracked', 0, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Limpa Vidro (5L)', NULL, 'Galão', 'Limpeza', 'tracked', 2, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Desinfetante (5L)', NULL, 'Galão', 'Limpeza', 'tracked', 3, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Detergente (5L)', NULL, 'Galão', 'Limpeza', 'tracked', 2, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Vassoura', NULL, 'Unidade', 'Limpeza', 'tracked', 0, 3, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Pá de Limpeza', NULL, 'Unidade', 'Limpeza', 'tracked', 0, 3, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Trincha', NULL, 'Unidade', 'Limpeza', 'tracked', 0, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Balde  (10L)', NULL, 'Unidade', 'Limpeza', 'tracked', 1, 5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Lava a Jato', NULL, 'Unidade', 'Limpeza', 'tracked', 1, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Filtro para Aspirador', NULL, 'Unidade', 'Limpeza', 'tracked', 3, 3, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Rodo Médio', NULL, 'Unidade', 'Limpeza', 'tracked', 0, 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Gel Removedor Stritizi', NULL, 'Galão', 'Limpeza', 'tracked', 1, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Propé', NULL, 'Pacote', 'Limpeza', 'tracked', 14, 5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Fecho Maxim-Ar (Padrão Alusistem)', NULL, 'Unidade', 'Esquadria', 'tracked', 11, 5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Recolhedor de Persiana de Janela (Padrão Alusistem)', NULL, 'Unidade', 'Esquadria', 'tracked', 9, 3, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Recolhedor de Porta Janela (Padrão Alusistem)', NULL, 'Unidade', 'Esquadria', 'tracked', 8, 3, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Pá de Concha', NULL, 'Unidade', 'Ferramenta', 'tracked', 4, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Picareta', NULL, 'Unidade', 'Ferramenta', 'tracked', 1, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Raspador', NULL, 'Unidade', 'Ferramenta', 'tracked', 1, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Régua de Alumínio 2M', NULL, 'Unidade', 'Ferramenta', 'tracked', 2, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Enxada', NULL, 'Unidade', 'Ferramenta', 'tracked', 1, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Riscadeira 1,2M', NULL, 'Unidade', 'Ferramenta', 'tracked', 1, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Riscadeira 50Cm', NULL, 'Unidade', 'Ferramenta', 'tracked', 1, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Escada Telescópica', NULL, 'Unidade', 'Ferramenta', 'tracked', 2, 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Escada de Correr', NULL, 'Unidade', 'Ferramenta', 'tracked', 1, 1, auth.uid());

-- UNTRACKED INVENTORY ITEMS (67 items)
-- These items are tracked for quantity only, no minimum stock alerts
INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Pó de Brita (20Kg)', NULL, 'Saco', 'Rejunte', 'untracked', 5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Disco Metal 9', NULL, 'Unidade', 'Disco', 'untracked', 20, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Disco Metal 7x7/8', NULL, 'Unidade', 'Disco', 'untracked', 3, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Disco Madeira 7-1/4', NULL, 'Unidade', 'Disco', 'untracked', 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Massa de Bater Acrílica', NULL, 'Saco', 'Pintura', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta SW Ouro Branco', NULL, 'Balde', 'Tinta', 'untracked', 0.5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Elastomérica SW Cinza Exclusivo', NULL, 'Balde', 'Tinta', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Elastomérica SW Paisagem Urbana', NULL, 'Balde', 'Tinta', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Elastomérica SW Guarda-Chuva', NULL, 'Balde', 'Tinta', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Suvinil Preto Absoluto', NULL, 'Balde', 'Tinta', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Elastomérica SW Cinza Asfalto', NULL, 'Balde', 'Tinta', 'untracked', 2, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Suvinil Cinza Asfalto', NULL, 'Balde', 'Tinta', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Elastomérica SW Tonininha', NULL, 'Balde', 'Tinta', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Suvinil Cimento Queimado Elefante', NULL, 'Galão', 'Tinta', 'untracked', 4, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Elastomérica SW Cinza Grisalho', NULL, 'Galão', 'Tinta', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Suvinil Aguarrás', NULL, 'Galão', 'Tinta', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Esmalte Coral Branco', NULL, 'Galão', 'Tinta', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta SW Rabanete', NULL, 'Galão', 'Tinta', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Esmalte Acetinada SW Branco Reservado', NULL, 'Galão', 'Tinta', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Suvinil Dubai (Estac. Live)', NULL, 'Galão', 'Tinta', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Elastomérica SW Ciberespaço (Ext. TSG)', NULL, 'Galão', 'Tinta', 'untracked', 0.5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Elastomérica SW Branco Reservado', NULL, 'Galão', 'Tinta', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Suvinil Cadeira de Bambu (1401 Vanguarda)', NULL, 'Galão', 'Tinta', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Elastomérica SW Ouro Branco', NULL, 'Galão', 'Tinta', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Elastomérica SW Cinza Africano (Ext. Plaza)', NULL, 'Galão', 'Tinta', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Acetinada Verde Exército (Restaurante Canto)', NULL, 'Galão', 'Tinta', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Semi-Brilho Coral Claridade Suave (L2 Vanguarda)', NULL, 'Galão', 'Tinta', 'untracked', 0.5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Elastomérica SW Toninha', NULL, 'Galão', 'Tinta', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Suvinil Ovelha (Estac. Work)', NULL, 'Galão', 'Tinta', 'untracked', 0.5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Suvinil Hippie Chique', NULL, 'Galão', 'Tinta', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Suvinil Pretz (1301 Vanguarda)', NULL, 'Galão', 'Tinta', 'untracked', 1.5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Elastomérica SW Patativa', NULL, 'Galão', 'Tinta', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Coral Arraia Gigante (1106 Work)', NULL, 'Galão', 'Tinta', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Coral Branco', NULL, 'Galão', 'Tinta', 'untracked', 0.5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Elastomérica SW Software (Ext. TSG)', NULL, 'Galão', 'Tinta', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Coral Sol Dourado (L1 Mall)', NULL, 'Galão', 'Tinta', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Elastomérica SW Cinza Exclusivo', NULL, 'Galão', 'Tinta', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Esmalte Suvinil Branco Fosco', NULL, 'Galão', 'Tinta', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Acetinada Suvinil Branco (Hall Aires)', NULL, 'Galão', 'Tinta', 'untracked', 1.5, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Acetinada Suvinil Preto Absoluto (Kids TSG)', NULL, 'Galão', 'Tinta', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Pinta Risco', NULL, 'Kit', 'Pintura', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Spray Vermelha', NULL, 'Tubo', 'Tinta', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Tinta Spray Verde', NULL, 'Tubo', 'Tinta', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Espaçador de piso 3mm', NULL, 'Pacote', 'Cerâmica', 'untracked', 1, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Silicone Estrutural DX Max 900 Cinza', NULL, 'Tubo', 'Tubular', 'untracked', 11, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Silicone Titebond Cinza', NULL, 'Tubo', 'Tubular', 'untracked', 12, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Silicone Preto', NULL, 'Tubo', 'Tubular', 'untracked', 6, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Máquina', NULL, 'Unidade', 'Fechadura', 'untracked', 48, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Maçaneta', NULL, 'Unidade', 'Fechadura', 'untracked', 17, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Chapa-Testa Arredondada', NULL, 'Unidade', 'Fechadura', 'untracked', 39, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Chapa-Testa Retangular', NULL, 'Unidade', 'Fechadura', 'untracked', 20, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Acabamento de Miolo', NULL, 'Unidade', 'Fechadura', 'untracked', 41, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Kit Completo Imab Tesca 55mm', NULL, 'Unidade', 'Fechadura', 'untracked', 3, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Kit Completo Imab Tesca 40mm', NULL, 'Unidade', 'Fechadura', 'untracked', 4, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Kit Completo Porta de Ferro 20mm', NULL, 'Unidade', 'Fechadura', 'untracked', 4, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Dobradiça', NULL, 'Unidade', 'Fechadura', 'untracked', 53, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Maçaneta Imab Malba (TSG)', NULL, 'Unidade', 'Fechadura', 'untracked', 14, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Chave para Banheiro', NULL, 'Unidade', 'Fechadura', 'untracked', 23, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Puxador', NULL, 'Par', 'Fechadura', 'untracked', 20, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Puxador Grande', NULL, 'Par', 'Fechadura', 'untracked', 0, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Veda-Fresta', NULL, 'Rolo', 'Esquadria', 'untracked', 0, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Borracha para Vidro', NULL, 'Rolo', 'Esquadria', 'untracked', 0, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Caixa de Dreno Deceuninck', NULL, 'Unidade', 'Esquadria', 'untracked', 0, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Fita de Vedação', NULL, 'Unidade', 'Esquadria', 'untracked', 0, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Dobradiça para Corta Fogo', NULL, 'Unidade', 'Fechadura', 'untracked', 0, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Haleta para Persiana (TSG, Inn)', NULL, 'Unidade', 'Esquadria', 'untracked', 0, auth.uid());

INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Haleta para Persiana Branca (Plaza Mayor)', NULL, 'Unidade', 'Esquadria', 'untracked', 0, auth.uid());

-- IMPORT SUMMARY:
-- Total items imported: 205
-- ✅ FIXED: All "Ferramenta" items now tracked with quantities
-- ✅ Unit and Category are separate columns
-- ✅ Only real location data from CSV used

-- BREAKDOWN:
-- Tracked items (with min stock): 138
-- Untracked items (quantity only): 67
-- Assets/Tools: 0 (should be 0 now!)

-- FERRAMENTA ITEMS ANALYSIS:
-- Ferramenta items (now tracked): 14
-- Trava Quedas 6M: 1/1 Unidade (Category: EPI)
-- Talabarte: 2/1 Unidade (Category: EPI)
-- Cinto de Segurança: 2/1 Unidade (Category: EPI)
-- Máscara de Solda: 0/1 Unidade (Category: EPI)
-- Lava a Jato: 1/1 Unidade (Category: Limpeza)
-- Pá de Concha: 4/1 Unidade (Category: Ferramenta)
-- Picareta: 1/1 Unidade (Category: Ferramenta)
-- Raspador: 1/1 Unidade (Category: Ferramenta)
-- Régua de Alumínio 2M: 2/1 Unidade (Category: Ferramenta)
-- Enxada: 1/1 Unidade (Category: Ferramenta)
-- Riscadeira 1,2M: 1/1 Unidade (Category: Ferramenta)
-- Riscadeira 50Cm: 1/1 Unidade (Category: Ferramenta)
-- Escada Telescópica: 2/1 Unidade (Category: Ferramenta)
-- Escada de Correr: 1/1 Unidade (Category: Ferramenta)

-- LOW STOCK ANALYSIS (items that will trigger auto-POs):
-- Items currently below minimum stock: 87
-- Placa RU Acartonado (Gesso): 0/3 Placa
-- Placa Convencional (Gesso): 0/3 Placa
-- Pó de Gesso (5kg) (Gesso): 0/2 Saco
-- Perfil Guia (Gesso): 0/1 Barra
-- Gesso Cola (5Kg) (Gesso): 1/2 Saco
-- Massa para Drywall (20Kg) (Gesso): 1/1 Balde
-- Graute (25Kg) (Concreto): 2/5 Saco
-- Autonivelante (20Kg) (Concreto): 4/5 Saco
-- Cimento CP32 (50Kg) (Concreto): 0/2 Saco
-- Argamassa de Projeção (25Kg) (Concreto): 0/5 Saco
-- Cimento Cola ACIII (25Kg) (Concreto): 0/5 Saco
-- Bianco (18L) (Alvenaria): 1/1 Balde
-- Tela Plástica Estuque (Alvenaria): 0/1 Rolo
-- Trava Quedas 6M (EPI): 1/1 Unidade
-- Máscara de Solda (EPI): 0/1 Unidade
-- ... and 72 more items
